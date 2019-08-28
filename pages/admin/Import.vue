<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>
        Nhập đối tượng
        <input type="file" id="file1" ref="file1" v-on:change="handleFileUpload1()" />
      </label>
      <v-btn
        :loading="loading1"
        :disabled="loading1"
        color="blue-grey"
        class="white--text"
        @click="submitPoorPerson"
      >
        Nhập dữ liệu
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      <v-flex style="color:red">
        {{poorPersonErr}}
      </v-flex>
    </div>
    <div class="large-12 medium-12 small-12 cell">
      <label>
        Nhập công trình
        <input type="file" id="file2" ref="file2" v-on:change="handleFileUpload2()" />
      </label>
      <v-btn
        :loading="loading2"
        :disabled="loading2"
        color="blue-grey"
        class="white--text"
        @click="submitConstruction"
      >
        Nhập dữ liệu
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      <v-flex style="color:red">
        {{constructErr}}
      </v-flex>
    </div>
    <v-layout>
      <v-flex>
        <v-flex class="title">Nhóm đối tượng</v-flex>
        <v-list-item v-for="(item, i) in poorGroups" :key="i">
          <v-flex>{{i+1}}. {{item.name}}</v-flex>
        </v-list-item>
        <v-flex>
          <v-layout>
            <v-text-field style="max-width: 30%;" v-model="newPoorPerson"></v-text-field>
            <v-btn
              :loading="newLoading1"
              :disabled="newLoading1"
              color="blue-grey"
              class="white--text"
              @click="addPoorPerson(newPoorPerson)"
            >Thêm đối tượng</v-btn>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-flex class="title">Nhóm công trình</v-flex>
        <v-list-item v-for="(item, i) in constructGroups" :key="i">
          <v-flex>{{i+1}}. {{item.name}}</v-flex>
        </v-list-item>
        <v-flex>
          <v-layout>
            <v-text-field style="max-width: 30%;" v-model="newConstruct"></v-text-field>
            <v-btn
              :loading="newLoading2"
              :disabled="newLoading2"
              color="blue-grey"
              class="white--text"
              @click="addConstruct(newConstruct)"
            >Thêm công trình</v-btn>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  layout: "info",
  data() {
    return {
      file: null,
      loading1: false,
      loading2: false,
      newLoading1: false,
      newLoading2: false,
      newConstruct: null,
      newPoorPerson: null,
      poorPersonErr: null,
      constructErr: null
    };
  },
  async created() {
    await this.$store.dispatch("modules/poorPerson/getAllPoorPeopleGroup");
    await this.$store.dispatch("modules/construction/getAllConstructionGroup");
  },
  computed: {
    ...mapGetters({
      poorGroups: "modules/poorPerson/poorGroup",
      constructGroups: "modules/construction/constructGroup"
    })
  },
  methods: {
    submitPoorPerson() {
      this.loading1 = true;
      let formData = new FormData();
      formData.append("file", this.file1);
      this.$store
        .dispatch("modules/poorPerson/importPeopleGroup", formData)
        .then(res => {
          if (res == "OK") {
            console.log("import success");
            this.$toast.success("Nhập dữ liệu thành công", { icon: "done" });
            this.loading1 = false;
          } else {
            this.$toast.error("Nhập dữ liệu lỗi", { icon: "error" });
            this.poorPersonErr = res.response.data.message;
            this.loading1 = false;
          }
        })
        .catch(err => {
          this.$toast.error("Nhập dữ liệu lỗi", { icon: "error" });
          this.loading1 = false;
        });
    },
    submitConstruction() {
      this.loading2 = true;
      let formData = new FormData();
      formData.append("file", this.file2);
      this.$store
        .dispatch("modules/construction/importConstruction", formData)
        .then(res => {
          console.log("res");
          if (res == "OK") {
            this.$toast.success("Nhập dữ liệu thành công", { icon: "done" });
            this.loading2 = false;
          } else {
            this.$toast.error("Nhập dữ liệu lỗi", { icon: "error" });
            this.constructErr = res.response.data.message;
            this.loading2 = false;
          }
        })
        .catch(err => {
          console.log("err");
          this.$toast.error("Nhập dữ liệu lỗi", { icon: "error" });
          this.loading2 = false;
        });
    },
    handleFileUpload1() {
      this.file1 = this.$refs.file1.files[0];
    },
    handleFileUpload2() {
      this.file2 = this.$refs.file2.files[0];
    },
    addConstruct(value) {
      this.newLoading2 = true;
      this.$store
        .dispatch("modules/construction/addNewGroup", value)
        .then(res => {
          if (res == "OK") {
            this.$toast.success("Nhập dữ liệu thành công", { icon: "done" });
            this.newLoading2 = false;
            this.$store.dispatch(
              "modules/construction/getAllConstructionGroup"
            );
          } else {
            this.$toast.error(res, { icon: "error" });
            this.newLoading2 = false;
          }
        })
        .catch(err => {
          this.$toast.error("Nhập dữ liệu lỗi", { icon: "error" });
          this.newLoading2 = false;
        });
      this.newConstruct = null;
    },
    addPoorPerson(value) {
      this.newLoading1 = true;
      this.$store
        .dispatch("modules/poorPerson/addNewGroup", value)
        .then(res => {
          if (res == "OK") {
            this.$toast.success("Nhập dữ liệu thành công", { icon: "done" });
            this.newLoading1 = false;
            this.$store.dispatch("modules/poorPerson/getAllPoorPeopleGroup");
          } else {
            this.$toast.error(res, { icon: "error" });
            this.newLoading1 = false;
          }
        })
        .catch(err => {
          this.$toast.error("Nhập dữ liệu lỗi", { icon: "error" });
          this.newLoading1 = false;
        });
      this.newPoorPerson = null;
    }
  }
};
</script>
<style lang='stylus' scoped></style>
