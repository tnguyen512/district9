<template lang="pug">
  v-layout.justify-center
    v-flex.xs12.sm6.md6
      v-flex(text-xs-center subject) CẨM NANG ĐỊA CHỈ TÌNH NGUYỆN
      v-tabs(dark color="cyan" slider-color="yellow" )
        v-tab Đối tượng
        v-tab-item
          v-card(flat)
            v-card-text
              v-form
                v-select(v-model="poorGroupSelect"
                  :items="poorGroupList"
                  label="Chọn nhóm")
                v-select(v-model="poorSelect"
                  :items="poorList"
                  label="Chọn tên")
                v-flex(v-if="poorSelect.id !== null" )
                  v-flex
                    span.font-weight-bold Năm sinh: 
                    span {{poorSelect.birthYear}} 
                  v-flex 
                    span.font-weight-bold Địa chỉ: 
                    span {{poorSelect.address}} 
                  v-flex 
                    span.font-weight-bold Hoàn cảnh: 
                    span {{poorSelect.status}} 
                  v-flex 
                    span.font-weight-bold Nhu cầu cần chăm lo: 
                    span {{poorSelect.demand}} 
                  v-flex 
                    span.font-weight-bold Đã hỗ trợ:
                    span {{poorSelect.supportInfo}} 
                  v-flex 
                    span.font-weight-bold Đơn vị đã hỗ trợ: 
                    span {{poorSelect.supportGroup}} 
                  //- v-flex 
                  //-   span.font-weight-bold Cán bộ phụ trách - SĐT: 
                  //-   span {{poorSelect.additional}}
                  v-flex 
                    span.font-weight-bold Hình ảnh: 
                  v-flex(v-for="(image, index) in poorSelect.imageUrls" :key="index")
                    span Link ảnh: {{image}}
                    v-img.flex(:src="image")
        v-tab Công trình
        v-tab-item
          v-card(flat)
            v-card-text
              v-form
                v-select(v-model="constructGroupSelect"
                  :items="constructGroupList"
                  label="Chọn nhóm")
                v-select(v-model="constructSelect"
                  :items="constructList"
                  label="Chọn tên")
                v-flex(v-if="constructSelect.id !== null" )
                  v-flex 
                    span.font-weight-bold Địa chỉ: 
                    span {{constructSelect.address}} 
                  v-flex 
                    span.font-weight-bold Hoàn cảnh: 
                    span {{constructSelect.status}} 
                  v-flex 
                    span.font-weight-bold Nhu cầu cần chăm lo: 
                    span {{constructSelect.demand}} 
                  v-flex 
                    span.font-weight-bold Đã hỗ trợ: 
                    span {{constructSelect.supportInfo}} 
                  v-flex 
                    span.font-weight-bold Đơn vị đã hỗ trợ: 
                    span {{constructSelect.supportGroup}} 
                  //- v-flex 
                  //-   span.font-weight-bold Cán bộ phụ trách - SĐT: 
                  //-   span {{constructSelect.additional}}
                  v-flex 
                    span.font-weight-bold Hình ảnh: 
                  v-flex(v-for="(image, index) in constructSelect.imageUrls" :key="index")
                    span Link ảnh: {{image}}
                    v-img.flex(:src="image")
</template>

<script>
import _ from "lodash";
import { mapGetters, mapActions } from "vuex";

export default {
  middleware: ["no-auth"],
  data() {
    return {
      model: "tab-2",
      poorGroupSelect: {
        id: null,
        slug: null,
        name: null
      },
      poorSelect: {
        id: null,
        name: null,
        group: null,
        address: null,
        additional: null,
        birthYear: null,
        imageUrls: null
      },
      poorList: [],
      constructGroupSelect: {
        id: null,
        slug: null,
        name: null
      },
      constructSelect: {
        id: null,
        group: null,
        address: null,
        additional: null,
        imageUrls: null
      },
      constructList: []
    };
  },
  async created() {
    await this.$store.dispatch("modules/poorPerson/getAllPoorPeopleGroup");
    await this.$store.dispatch("modules/construction/getAllConstructionGroup");
  },
  computed: {
    ...mapGetters({
      poorGroups: "modules/poorPerson/poorGroup",
      poorPeople: "modules/poorPerson/poorPeople",
      constructGroups: "modules/construction/constructGroup",
      construction: "modules/construction/construction"
    }),
    poorGroupList() {
      return this.mapListDataToGroupListByName(this.poorGroups);
    },
    constructGroupList() {
      return this.mapListDataToGroupListByName(this.constructGroups);
    }
  },
  watch: {
    async poorGroupSelect() {
      this.poorSelect.slug = null;
      await this.$store.dispatch(
        "modules/poorPerson/getPoorPeopleByGroupId",
        this.poorGroupSelect.slug
      );
      this.poorList = this.mapListDataToGroupListByName(this.poorPeople);
    },
    async constructGroupSelect() {
      this.constructSelect.slug = null;
      await this.$store.dispatch(
        "modules/construction/getConstructionByGroupId",
        this.constructGroupSelect.slug
      );
      this.constructList = this.mapListDataToGroupListByName(this.construction);
    }
  },
  mounted() {
    this.$validator.localize("vn", this.dictionary);
    this.structureGroups = _.map(this.constructData, "group");
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
    mapListDataToGroupListByName(data) {
      let resultList = [];
      data.map(function(value, key) {
        let item = {
          text: (value.name === undefined || value.name === null) ? value.address : value.name,
          value: value
        };
        resultList.push(item);
      });
      return resultList;
    }
  }
};
</script>
<style lang='stylus' scoped>
.subject {
  font-size: 3em;
  margin-bottom: 1em;
  color: deeppink;
}

.question {
  font-size: 2em;
}
</style>
