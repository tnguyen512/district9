export const state = () => ({
  user_login: null,
  token: null,
  refresh_token: null,
  meta: {
    title: 'Trang chủ'
  },
  config: {
    emptyText: 'Chưa cập nhật'
  },
  column_layout: {
    first: {
      tileIndex: 0
    },
    second: {},
    third: {}
  },
  drawer_menu: false
})

export const mutations = {
  SET_USER_LOGIN(state, user_login) {
    state.user_login = user_login
  },
  SET_ACCESS_TOKEN(state, data) {
    state.token = data
  },
  SET_REFRESH_TOKEN(state, data) {
    state.refresh_token = data
  },
  SET_META(state, { index, value }) {
    state.meta[index] = value
  },
  SET_DRAWER_MENU(state) {
    state.drawer_menu = !state.drawer_menu
  },
  SET_FIRST_COLUMN_CURRENT_TAB(state, index) {
    state.column_layout.first.tileIndex = index
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  updateCurrentTab({ commit, dispatch }, index) {
    commit('SET_FIRST_COLUMN_CURRENT_TAB', index)
  },
  updateDrawerMenu({ commit }, ) {
    commit('SET_DRAWER_MENU')
  },
  updateToken({ commit }, { token, refresh_token, user_login }) {
    commit('SET_ACCESS_TOKEN', token)
    commit('SET_REFRESH_TOKEN', refresh_token)
    commit('SET_USER_LOGIN', user_login)
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('refresh_token', refresh_token)
    sessionStorage.setItem('user_login', JSON.stringify(user_login))
    return Promise.resolve(token)
  },

  removeToken({ commit }) {
    sessionStorage.clear()
    commit('SET_ACCESS_TOKEN', null)
    commit('SET_REFRESH_TOKEN', null)
    commit('SET_USER_LOGIN', null)
    this.$axios.setToken(false)
    this.app.router.push({ name: 'login' })
    throw new Error(new Error())
  },

  async login({ commit, dispatch }, { email, password, self }) {
    try {
      const { data } = await this.$axios.post('login', { email, password })
      this.$axios.setToken(data.data.token, 'Bearer')
      // dispatch('updateToken', { token: data.data.access_token, refresh_token: data.data.refresh_token, user_login: data.data.userProfile })
      dispatch('updateToken', { token: data.data.token, refresh_token: null, user_login: null})
      self.$router.push({ name: 'index' })
      return Promise.resolve()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch('removeToken', { token: null, refresh_token: null, user_login: null })
      }
      throw new Error(error.message)
    }
  },

  async refreshToken({ commit, state, dispatch }) {
    try {
      this.$axios.setToken(sessionStorage.getItem('refresh_token'), 'Bearer')
      const { data } = await this.$axios.put('authenticate')
      dispatch('updateToken', { token: data.data.access_token, refresh_token: data.data.refresh_token, user_login: data.data.userProfile })
      return data
    } catch (error) {
      /* if (error.response && error.response.status === 401) {
        dispatch('removeToken', { token: null, refresh_token: null, user_login: null })
        throw new Error(error.response)
      } */
      dispatch('removeToken', { token: null, refresh_token: null, user_login: null })
      throw new Error(error.message)
    }
  },

  async logout({ commit, dispatch }) {
    try {
      await this.$axios.delete('authenticate')
      dispatch('removeToken')
      return Promise.resolve()
    } catch (error) {
      dispatch('removeToken')
      throw new Error(new Error())
    }
  }

}

export const getters = {
  token(state) {
    return state.token
  },
  refresh_token(state) {
    return state.refresh_token
  },
  user_login(state) {
    return state.user_login
  },
  meta(state) {
    return state.meta
  },
  config(state) {
    return state.config
  },
  drawer_menu(state) {
    return state.drawer_menu
  },
  column_layout(state) {
    return state.column_layout
  }
}

export const strict = false
