// ====== ОБЩИЕ НАСТРОЙКИ — ВСЁ, ЧТО НУЖНО МЕНЯТЬ, ЗДЕСЬ ======

export const profile = {
  nick: 'Boundless',
  domain: 'boundless.dev',
  email: 'boundless.dev@internet.ru',
  github: 'https://github.com/bounddless',
  discord: 'https://discord.com/users/591537234914705411',
  telegram: 'https://t.me/knxwn',
}

// Фон главной: положи картинку в public/img и впиши путь, например 'img/hero-bg.jpg'.
// '' — фона-картинки нет (дуга и свечение остаются в любом случае).
export const heroBackground = ''

// Форма «Обсудить проект» отправляет письмо тебе на почту через Web3Forms (бесплатно, без бэкенда):
// 1) зайди на https://web3forms.com → «Create your Access Key» → введи свою почту
// 2) ключ придёт на почту — вставь его сюда.
// Пока ключа нет, форма откроет почтовый клиент (mailto).
export const contactForm = {
  accessKey: 'bfdf7b08-1ff7-4da8-b94e-09ef1f217c4e',
}

// Живые карточки Spotify/Discord:
// 1) зайди на сервер https://discord.gg/lanyard  2) вставь сюда свой Discord ID.
export const DISCORD_ID = '591537234914705411'

export const nav = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'Профиль' },
  { to: '/services', label: 'Услуги' },
  { to: '/projects', label: 'Работы' },

]

export const about = {
  short:
    'Привет! Я Егор, веб-разработчик из Нижнего Новгорода. Сейчас изучаю Vue, Laravel, работаю над своими проектами и просто стараюсь делать крутые вещи.',
  paragraphs: [
    'Привет! Я Егор, веб-разработчик из Нижнего Новгорода. Делаю сайты и небольшие веб-приложения: от вёрстки до релиза.',
    'Сейчас изучаю Vue, Laravel, Yii2, работаю над своими проектами.',
  ],
  stack: ['HTML', 'CSS', 'JavaScript', 'Vue 3', 'WordPress', 'PHP'],
}

export const services = [
  { icon: 'code', label: 'Веб-разработка', desc: 'Сайты и веб-приложения под ключ: от идеи до запуска.' },
  // { icon: 'pen', label: 'Дизайн интерфейсов', desc: 'Аккуратные современные интерфейсы, которые удобно использовать.' },
  { icon: 'layout', label: 'Верстка', desc: 'Адаптивная вёрстка по макету: чисто, быстро и без лишнего.' },
  // { icon: 'chat', label: 'Консультации', desc: 'Помогу выбрать технологии и разобраться с задачей.' },
]
