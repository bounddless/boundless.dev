import { ref } from 'vue'

// Общее состояние формы: любую кнопку «Обсудить проект» можно повесить на openContact
export const contactOpen = ref(false)
export const openContact = () => (contactOpen.value = true)
export const closeContact = () => (contactOpen.value = false)
