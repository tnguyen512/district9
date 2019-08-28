<template lang="pug">
  v-container(fluid)
    v-layout(row style="margin-bottom: 5px; height: 160px;")
      v-flex.company-avatar(xs2)
        v-card(tile flat)
          img(:src="company.logo")
      v-flex.company-block(xs10)
        v-card(tile flat)
          v-flex
            span.company-name {{company.name}}
          v-flex
            v-icon.company-icon location_on
            span.company-info {{company.country}}
          v-flex
            v-icon.company-icon settings
            span.company-info {{company.type}} 
            v-icon.company-icon people
            span.company-info {{company.size}} 
            v-icon.company-icon public
            span.company-info {{company.country}}
          v-flex
            span.technical-tag(v-for="(tech, index) in company.technicals", :key="index") {{tech}}
    v-flex.detail-block
      v-tabs(
        slot="extension"
        v-model="tab"
        color="ttdGray"
        align-with-title)
        v-tabs-slider(color="ttdOrange")
        v-tab overview
        v-tab reviews
      v-tabs-items(v-model="tab")
        v-tab-item
          v-card(flat)
            v-card-text {{company.description}}
        v-tab-item
          v-card(flat)
            v-card-text
              v-layout(row wrap)
                v-flex.sm6
                  v-flex
                    star-rating(
                      v-model="company.rating" 
                      read-only 
                      :show-rating="false"
                      :increment="0.1" 
                      active-color="#fbb03b"
                      :star-size="35"
                      :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]")
                  v-flex
                    h2 {{company.rating}} stars
                v-flex.sm6
                  v-layout(row align-center justify-end)
                    v-flex.sm2
                      //- circle-progress
                    v-flex.sm3(style="font-size: 22px; padding-left: 10px;")
                      v-flex Encourage work here
              v-flex(style="margin-top: 20px;")
                v-flex(style="margin-bottom: 10px; font-size: 25px;")
                  v-flex Detailed evaluation
                v-layout(row v-for="(item, index) in detailEvaluation", :key="index")
                  v-flex.sm2
                    v-flex {{item.title}}
                  v-flex.sm2
                    star-rating(
                      v-model="item.rating" 
                      read-only 
                      :increment="0.1" 
                      active-color="#fbb03b"
                      :star-size="20"
                      text-class="custom-text")
    v-card-text.border-left-bottom
      v-layout(sm9 align-center justify-start style="height:60px; font-size: 25px;") Comments
    v-card-text.border-left-bottom(v-for="(comment, index) in comments", :key="index")
      v-layout(row style="padding-bottom:16px; border-bottom:solid 1px #e3eef5")
        v-flex.sm1.border-left-bottom
          img(src="")
        v-flex.sm2
          v-flex {{comment.title}}
          v-flex 
            star-rating(
              :inline="true" 
              :star-size="15" 
              :read-only="true" 
              :show-rating="false" 
              active-color="#fbb03b"
              :rating="5")
        v-layout(sm9 align-end justify-end) {{comment.modified | formatDateTime}}
      v-layout(style="padding-top:16px;") {{comment.preview}}
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import { ProgressCircle } from 'vue-progress-circle'
// import circleProgress from '@/components/CircleProgress.vue'

export default {
  name: 'company',
  layout: 'info',
  components: {
    // circleProgress
  },
  data: () => ({
    dateTest: '2018-10-27 07:04',
    detailEvaluation: [
      {
        title: 'Wages and benefits',
        rating: 4.1
      },
      {
        title: 'Training and learning',
        rating: 4.2
      },
      {
        title: 'Attention to staff',
        rating: 4.3
      },
      {
        title: 'Company culture',
        rating: 4.4
      },
      {
        title: 'Office',
        rating: 4.5
      }
    ],
    tab: null,
    items: [
      'Overview', 'Reviews'
    ]
  }),
  async fetch ({ store, params }) {
    await store.dispatch('modules/company/getCompanyBySlug', params.name);
    await store.dispatch('modules/comment/getComments', params.name);
  },
  computed: {
    ...mapGetters({
      company: 'modules/company/company',
      comments: 'modules/comment/comments'
    })
  },
  methods: {
    async pagingLoad(page) {
      this.pagination.pageNumber=page;
      // this.companies = await this.$store.dispatch('modules/company/getCompanies', this.pagination);
    }
  }
};
</script>
<style lang="stylus" scoped>
.review-detail
  float left
.company-avatar
  margin auto
  text-align center
  &:hover
    cursor pointer
  img
    max-width 170px
    max-height 104px
.company-block
  margin auto
  margin-left 3em
  .company-name
    color #0076bd
    font-size 24px
    &:hover
      cursor pointer
  .company-info
    color #666666
    margin-right 7px
  .company-icon
    font-size 16px
    margin-right 4px
  .technical-tag
    background #e1ecf4
    margin-right 12px
    padding 1px 6px
    display inline-block
    font-size 11px
    margin-top 8px
    color #39739d
    &:hover
      background #cee0ed
      cursor pointer
.detail-block
  border-left solid 1px #b2d3e6
  border-bottom solid 1px #b2d3e6
  border-top solid 1px #b2d3e6
  height 400px
.border-left-bottom
  border-left solid 1px #b2d3e6
  border-bottom solid 1px #b2d3e6
.custom-text
  font-weight bold
  font-size 10em
  border 1px solid #cfcfcf
  padding-left 10px
  padding-right 10px
  border-radius 5px
  color #999
  background #fff
</style>