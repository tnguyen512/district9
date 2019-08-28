<template lang="pug">
  v-app(id="inspire")  
    v-toolbar(color="primary" dark app clipped-left fixed flat)
        div(@click="goHome")
          logo
        div.hidden-sm-and-down.logo-title
          v-flex ĐOÀN TNCS HỒ CHÍ MINH - HỘI LHTN VIỆT NAM
          v-flex.text-xs-center QUẬN 9
    v-content(style="background-color: rgb(209, 238, 255);")
      v-container
        img.flex(style="width: 81em; height: 20em;" src="/banner.jpg")
      v-container(fluid)
        nuxt
        //- google-maps
    v-footer.text-xs-center(color="primary" dark style)
      v-spacer
        v-flex &copy; Copyright 2019 - All rights reserved
</template>
<script>
import logo from '@/components/Logo.vue'
import googleMaps from '@/components/GoogleMaps.vue'

export default {
  data: () => ({
  }),
  components: {
    logo,
    googleMaps
  },
  computed: {
  },
  methods: {
    goHome() {
      this.$router.push('/')
    }
  }
};
</script>
<style lang='stylus' scoped>
.logo-title
  font-size 1.1em
  font-weight bolder
</style>

