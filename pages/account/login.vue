<template lang="pug">
  v-layout.align-center.justify-center
    v-flex.xs12.sm8.md4
      v-card.elevation-12
        v-toolbar(dark color="primary")
          v-toolbar-title Login Form
          v-spacer
        v-card-text
          v-form
            v-text-field(prepend-icon="person", name="Username", label="Username", v-model="loginData.email")
            v-text-field(prepend-icon="lock", name="Password", label="Password", v-model="loginData.password")
        v-card-actions
          v-spacer
          v-btn(color="primary" @click="callLogin") Login
</template>

<script>

export default {
  middleware: ['no-auth'],
  data() {
    return {
      loginData: {
        email: 'thivanngoctuan',
        password: 'tuanthi12345'
      },
      adminData: {
        email: 'thivanngoctuan',
        password: 'tuanthi12345'
      }
    };
  },
  methods: {
    async callLogin() {
      this.loading = true
      if(this.loginData.email === this.adminData.email && this.loginData.password === this.adminData.password) {
        this.$toast.success('Successfully Logged In', {icon: "done"});
        this.$router.push(`/`);
      } else {
        this.$toast.error('Username or Password wrong', {icon: "error"});
      }
    },
    async logout() {
      try {
        // await this.$store.dispatch('logout')
        this.$auth.logout()
      } catch (e) {
        this.formError = e.message
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>
