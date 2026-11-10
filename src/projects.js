// ============================================================
//  ПРОЕКТЫ. Чтобы добавить новый — скопируй объект и вставь в массив.
//
//  slug      — адрес страницы проекта: /#/projects/<slug> (латиница, без пробелов)
//  name      — название
//  desc      — короткое описание (на карточке)
//  details   — подробное описание (на странице проекта), можно оставить ''
//  tags      — технологии: ['Vue', 'Tailwind']
//  image     — картинка из public/img, например 'img/belinka.png' ('' = серый квадрат)
//  url       — ссылка на живой сайт ('' = кнопка скрыта)
//  repo      — ссылка на GitHub ('' = кнопка скрыта)
//  featured  — true: показывать на главной (там максимум 3)
// ============================================================

export const projects = [
  // {
  //   slug: 'belinka-dental',
  //   name: 'Belinka Dental',
  //   desc: 'Сайт для стоматологической клиники в Нижнем Новгороде.',
  //   details: '',
  //   tags: ['WordPress'],
  //   image: '',
  //   url: '',
  //   repo: '',
  //   featured: true,
  // },
  {
    slug: 'boundless.dev',
    name: 'boundless.dev',
    desc: 'Мой сайт-визитка',
    details: '',
    tags: ['Vue 3', 'TailwindCSS'],
    image: 'img/angel.jpg',
    url: '',
    repo: '',
    featured: true,
  },
  // {
  //   slug: 'pixel-incremental',
  //   name: 'Pixel Incremental',
  //   desc: '2D инкрементальная игра.',
  //   details: '',
  //   tags: ['Godot'],
  //   image: '',
  //   url: '',
  //   repo: '',
  //   featured: true,
  // },
]
