import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: '#0076bd', // blue 1
    secondary: '#008cdc', // blue 2
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    ttdGray: '#e9eff2', // gray
    ttdOrange: '#fbb03b', // orange
    ttdBlue: '#b2d3e6' // blue 3
  },
});
