<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { DISCORD_ID, profile } from '../data.js'
import BrandIcon from './BrandIcon.vue'
import Icon from './Icon.vue'

const HAS_ID = Boolean(DISCORD_ID)

// ---------- состояние ----------
// demo — нет DISCORD_ID | connecting | live (WebSocket) | polling (REST) | error
const sync = ref(HAS_ID ? 'connecting' : 'demo')
const syncError = ref('')
const lastUpdate = ref(0)

const DEMO_DURATION = 388000
const spotify = ref(
  HAS_ID
    ? null
    : { song: 'Nothing Else Matters', artist: 'Metallica', art: null,
        start: Date.now() - 92000, end: Date.now() - 92000 + DEMO_DURATION, demo: true },
)
const discord = ref({ status: HAS_ID ? 'offline' : 'online', name: HAS_ID ? '…' : 'eg0r', detail: HAS_ID ? '' : 'in a voice channel', avatar: null })

const now = ref(Date.now())
let tick, pollTimer, hbTimer, reconnectTimer, ws
let retry = 0
let closed = false
let refreshedFor = 0

// ---------- разбор ответа Lanyard (одинаковый для WebSocket и REST) ----------
function apply(data) {
  if (!data) return
  const sp = data.listening_to_spotify && data.spotify
  spotify.value = sp
    ? { song: sp.song, artist: sp.artist, art: sp.album_art_url, start: sp.timestamps.start, end: sp.timestamps.end }
    : null
  const u = data.discord_user
  if (u) {
    const game = data.activities?.find((a) => a.type === 0)
    discord.value = {
      status: data.discord_status,
      name: u.global_name || u.username,
      detail: game ? game.name : data.discord_status === 'offline' ? 'offline' : 'в сети',
      avatar: u.avatar ? `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=128` : null,
    }
  }
  lastUpdate.value = Date.now()
}

// ---------- REST (запасной вариант и ручное обновление) ----------
async function fetchRest() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`, { cache: 'no-store' })
    const json = await res.json()
    if (!json.success) throw new Error(json.error?.message || 'Lanyard вернул ошибку')
    apply(json.data)
    syncError.value = ''
    if (sync.value !== 'live') sync.value = 'polling'
  } catch (e) {
    console.warn('[activity] REST error:', e)
    syncError.value = e.message || 'Не удалось получить данные'
    if (sync.value !== 'live') sync.value = 'error'
  }
}

// ---------- WebSocket: данные приходят сразу, без опроса ----------
function connect() {
  if (closed) return
  try {
    ws = new WebSocket('wss://api.lanyard.rest/socket')
  } catch (e) {
    scheduleReconnect()
    return
  }
  ws.onmessage = (ev) => {
    let msg
    try { msg = JSON.parse(ev.data) } catch { return }
    if (msg.op === 1) {
      // hello → подписываемся и запускаем heartbeat
      ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }))
      clearInterval(hbTimer)
      hbTimer = setInterval(() => ws.readyState === 1 && ws.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval)
    } else if (msg.op === 0) {
      // INIT_STATE / PRESENCE_UPDATE
      apply(msg.d)
      sync.value = 'live'
      syncError.value = ''
      retry = 0
    }
  }
  ws.onerror = () => ws.close()
  ws.onclose = () => {
    clearInterval(hbTimer)
    if (closed) return
    if (sync.value === 'live') sync.value = 'polling'
    scheduleReconnect()
  }
}
function scheduleReconnect() {
  clearTimeout(reconnectTimer)
  reconnectTimer = setTimeout(connect, Math.min(1000 * 2 ** retry++, 15000))
}

function onVisible() {
  if (document.visibilityState === 'visible' && HAS_ID) fetchRest() // вернулся на вкладку — сразу обновляем
}

// ---------- прогресс трека ----------
const total = computed(() => (spotify.value ? spotify.value.end - spotify.value.start : 0))
const elapsed = computed(() => {
  const s = spotify.value
  if (!s) return 0
  const e = now.value - s.start
  return s.demo ? e % total.value : Math.min(Math.max(e, 0), total.value)
})
const progress = computed(() => (total.value ? (elapsed.value / total.value) * 100 : 0))

function fmt(ms) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

const statusLabel = computed(
  () => ({ online: 'Online', idle: 'Idle', dnd: 'Do not disturb', offline: 'Offline' })[discord.value.status] || discord.value.status,
)

const syncText = computed(() => {
  switch (sync.value) {
    case 'demo': return 'Демо-данные — укажи DISCORD_ID в src/data.js'
    case 'connecting': return 'Подключаюсь…'
    case 'live': return 'Live'
    case 'polling': return 'Обновляется раз в 10 с'
    default: return syncError.value || 'Нет связи'
  }
})

onMounted(() => {
  tick = setInterval(() => {
    now.value = Date.now()
    // трек закончился, а новых данных нет — дёргаем REST (не чаще раза на трек)
    const s = spotify.value
    if (HAS_ID && s && now.value > s.end + 1500 && refreshedFor !== s.end) {
      refreshedFor = s.end
      fetchRest()
    }
  }, 250)

  if (!HAS_ID) return
  fetchRest()
  connect()
  // REST раз в 10 с как страховка, если WebSocket молчит/режется
  pollTimer = setInterval(() => { if (sync.value !== 'live') fetchRest() }, 10000)
  document.addEventListener('visibilitychange', onVisible)
})
onBeforeUnmount(() => {
  closed = true
  clearInterval(tick); clearInterval(pollTimer); clearInterval(hbTimer); clearTimeout(reconnectTimer)
  document.removeEventListener('visibilitychange', onVisible)
  ws && ws.close()
})
</script>

<template>
  <aside class="activity">
    <!-- Spotify -->
    <section class="act spotify">
      <header class="act-head">
        <span class="brand-tile spotify"><BrandIcon name="spotify" :size="18" /></span>
        <div class="act-meta">
          <span class="act-title">Spotify</span>
          <span class="act-status" :class="{ live: spotify }">
            {{ spotify ? 'Listening now' : 'Не играет' }}
          </span>
        </div>
        <span v-if="spotify" class="bars" aria-hidden="true"><i /><i /><i /><i /></span>
      </header>

      <div v-if="spotify" class="np">
        <div class="cover"><img v-if="spotify.art" :src="spotify.art" alt="" /></div>
        <div class="np-info">
          <div class="track-name">{{ spotify.song }}</div>
          <div class="track-artist">{{ spotify.artist }}</div>
          <div class="progress" role="progressbar" :aria-valuenow="Math.round(progress)" aria-valuemin="0" aria-valuemax="100">
            <span :style="{ width: progress + '%' }" />
          </div>
          <div class="times"><span>{{ fmt(elapsed) }}</span><span>{{ fmt(total) }}</span></div>
        </div>
      </div>
      <p v-else class="idle">Сейчас ничего не играет</p>
    </section>

    <!-- Discord -->
    <section class="act discord">
      <header class="act-head">
        <span class="brand-tile discord"><BrandIcon name="discord" :size="18" /></span>
        <div class="act-meta">
          <span class="act-title">Discord</span>
          <span class="act-status" :class="['s-' + discord.status]">{{ statusLabel }}</span>
        </div>
      </header>

      <div class="who">
        <div class="avatar-wrap">
          <img v-if="discord.avatar" class="avatar" :src="discord.avatar" alt="" />
          <span v-else class="avatar avatar-ph" />
          <span class="presence" :class="'s-' + discord.status" />
        </div>
        <div class="who-info">
          <div class="track-name">{{ discord.name }}</div>
          <div class="track-artist">{{ discord.detail }}</div>
        </div>
        <a class="join" :href="profile.discord" target="_blank" rel="noopener">
          Join <Icon name="arrow" />
        </a>
      </div>
    </section>

    <!-- индикатор соединения -->
    <div class="sync" :class="'sync-' + sync" :title="syncError">
      <span class="sync-dot" /> {{ syncText }}
    </div>
  </aside>
</template>
