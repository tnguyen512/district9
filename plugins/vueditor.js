import Vue from 'vue'
import Vuex from 'vuex'
import Vueditor from 'vueditor'

import '~/node_modules/vueditor/dist/style/vueditor.min.css'

let config = {
  fontName: [
    {val: 'arial black'},
    {val: 'times new roman'},
    {val: 'Courier New'}
  ],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: ''
}

Vue.use(Vuex)
Vue.use(Vueditor, config)
