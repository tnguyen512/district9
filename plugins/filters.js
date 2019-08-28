import Vue from 'vue'

Vue.filter('formatDate', (date) => {
  if (!date) {
    return null
  }
  const [year, month, day] = date.split('-')
  return `${day}/${month}/${year}`
})
Vue.filter('formatMonth', (date) => {
  if (!date) {
    return null
  }
  const [year, month] = date.split('-')
  return `${month}/${year}`
})
Vue.filter('formatDateTime', (dateTime) => {
  if (!dateTime) {
    return null
  }
  const [date, time] = dateTime.split('T')
  const [year, month, day] = date.split('-')
  const [hours, minutes, seconds] = time.split(':')
  return `${day}/${month}/${year} ${hours}:${minutes}`
})
