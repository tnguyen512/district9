export default function ({ store, redirect }) {
  if (store.state.token == null) {
    redirect('/account/login')
  } else {
    const token = sessionStorage.getItem('token')
    const refresh_token = sessionStorage.getItem('refresh_token')
    const user_login = JSON.parse(sessionStorage.getItem('user_login'))
    store.dispatch('updateToken', { token, refresh_token, user_login })
  }
}
