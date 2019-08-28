import Vue from 'vue';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAeuHt5hiR02zaAXMJsmp5z01gOw67iNDs",
    libraries: "places" // necessary for places input
  }
});

Vue.use(VueGoogleMaps, {
  load: {
    region: 'VI',
    language: 'vi',
  },
})