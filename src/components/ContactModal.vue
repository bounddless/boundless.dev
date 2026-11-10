<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { profile, contactForm } from '../data.js'
import { contactOpen, closeContact } from '../modal.js'
import Icon from './Icon.vue'

const name = ref('')
const email = ref('')
const message = ref('')
const botcheck = ref(false) // honeypot от спам-ботов: человек его не видит
const sending = ref(false)
const done = ref(false)
const error = ref('')
const nameInput = ref(null)

watch(contactOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    done.value = false
    error.value = ''
    await nextTick()
    nameInput.value?.focus()
  }
})

function onKey(e) {
  if (e.key === 'Escape' && contactOpen.value) closeContact()
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

function validate() {
  if (!name.value.trim()) return 'Введите имя'
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) return 'Проверьте email'
  if (message.value.trim().length < 5) return 'Напишите, пожалуйста, ваш вопрос'
  return ''
}

async function submit() {
  error.value = validate()
  if (error.value) return

  // Ключа нет — запасной вариант: открываем почтовый клиент
  if (!contactForm.accessKey) {
    const body = `${message.value}\n\n— ${name.value} (${email.value})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Вопрос с ' + profile.domain)}&body=${encodeURIComponent(body)}`
    return
  }

  sending.value = true
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: contactForm.accessKey,
        subject: `Новое сообщение с ${profile.domain}`,
        from_name: profile.domain,
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
        botcheck: botcheck.value,
      }),
    })
    const json = await res.json()
    if (json.success) {
      done.value = true
      name.value = email.value = message.value = ''
    } else {
      error.value = json.message || 'Не удалось отправить. Попробуйте ещё раз.'
    }
  } catch (e) {
    error.value = `Нет связи. Попробуйте ещё раз или напишите на ${profile.email}`
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="contactOpen" class="modal-backdrop" @mousedown.self="closeContact">
        <div class="modal glass" role="dialog" aria-modal="true" aria-labelledby="contact-title">
          <button class="modal-close" type="button" aria-label="Закрыть" @click="closeContact">
            <Icon name="close" />
          </button>

          <template v-if="!done">
            <h2 id="contact-title" class="modal-title">Обсудим проект</h2>
            <p class="muted small modal-sub">Оставьте контакты и вопрос — отвечу на почту.</p>

            <form novalidate @submit.prevent="submit">
              <label class="field">
                <span>Имя</span>
                <input ref="nameInput" v-model="name" type="text" name="name" autocomplete="name" placeholder="Как вас зовут" />
              </label>
              <label class="field">
                <span>Email</span>
                <input v-model="email" type="email" name="email" autocomplete="email" placeholder="you@example.com" />
              </label>
              <label class="field">
                <span>Ваш вопрос</span>
                <textarea v-model="message" name="message" rows="4" placeholder="Расскажите о задаче" />
              </label>

              <input v-model="botcheck" type="checkbox" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true" />

              <p v-if="error" class="form-error" role="alert">{{ error }}</p>

              <button class="btn btn-block" type="submit" :disabled="sending">
                {{ sending ? 'Отправляю…' : 'Отправить' }}
              </button>
            </form>
          </template>

          <div v-else class="sent">
            <h2 id="contact-title" class="modal-title">Спасибо!</h2>
            <p class="muted">Сообщение отправлено. Отвечу на вашу почту в ближайшее время.</p>
            <button class="btn btn-block" type="button" @click="closeContact">Закрыть</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
