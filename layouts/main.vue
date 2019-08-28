<template lang="pug">
  v-app(id="inspire")
    v-toolbar(color="primary" dark app clipped-left fixed flat)
      v-layout(row wrap style="padding-top:6px;")
        v-flex.sm2(@click="goHome")
          logo
        v-flex.sm8
          v-text-field(
            append-icon="search"
            class="mx-3"
            flat
            label="Search"
            solo-inverted)
        v-flex.sm2
    v-content(style="background-color: white;")
      v-container(fluid)
        v-layout(row wrap)
          v-flex.column-first(d-flex sm2)
            v-card(tile flat)
              v-card-title(primary class="title") Filter:
              v-list(v-for="(item, index) in firstColumnTiles" :key="index")
                v-list-tile(v-bind:class="{'list-tile': onTabIndex == index}" ripple @click="setCurrentTab(index)")
                  v-list-tile-title {{item}}
          v-flex(d-flex sm7)
            v-card(tile flat)
              nuxt
          v-flex(d-flex sm3)
            v-card(tile flat)
              //TO DO
      v-flex.text-xs-right.scroll-to-top
        v-btn(fab dark color="primary" @click="scrollTop")
          v-icon(dark) arrow_upward
      v-footer.text-xs-center(color="primary" dark style)
        v-spacer
          v-flex &copy; Copyright 2018 - All rights reserved
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logo from '@/components/Logo.vue'

export default {
  data: () => ({
    drawer: null,
    firstColumnTiles: [
      'Top 3 views',
      'Top 3 rating',
      'All company',
      'Tags'
    ]
  }),
  components: {
    logo
  },
  computed: {
    ...mapGetters([
      'column_layout'
    ]),
    onTabIndex() {
      return this.column_layout.first.tileIndex
    }
  },
  methods: {
    ...mapActions(['updateCurrentTab']),
    setCurrentTab(index) {
      this.updateCurrentTab(index)
      this.$router.push('/')
    },
    async logout() {
      try {
        // await this.$store.dispatch('logout')
        this.$auth.logout()
      } catch (e) {
        this.formError = e.message
      }
    },
    scrollTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    goHome() {
      this.$router.push('/')
    }
  }
};
</script>
<style lang='stylus' scoped>
  .column-first
    .list-tile
      background-color: #e9eff2
      border-right solid 3px #fbb03b
  .input-group
    max-width 400px
  .scroll-to-top
    position fixed
    bottom 45px
    right 30px
</style>

