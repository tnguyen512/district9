<template lang="pug">
  v-app(id="inspire")
    v-toolbar(color="primary" dark app clipped-left fixed flat)
      v-layout(row wrap style="padding-top:6px;")
        v-flex.sm2(@click="goHome")
          logo
        v-flex.sm8
        v-flex.sm2
    v-content(style="background-color: rgb(209, 238, 255);")
      v-container(fluid fill-height)
        v-layout(row wrap)
          v-flex(d-flex sm9)
            v-card(tile flat)
              nuxt
          v-flex(d-flex sm3)
            v-card(tile flat)
      v-footer.text-xs-center(color="primary" dark style)
        v-spacer
          v-flex &copy; Copyright 2019 - All rights reserved
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logo from '@/components/Logo.vue'

export default {
  data: () => ({
  }),
  components: {
    logo
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
  .scroll-to-top
    margin 0 20px 20px 0
</style>

