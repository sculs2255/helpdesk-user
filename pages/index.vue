<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="9">
      
      <v-container>
        <SendSB />
        <ResetPassSB />
        <RecentCase />
        <br />
        <SendButton />
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import RecentCase from '~/components/home/RecentCase.vue'
import SendButton from '~/components/home/SendButton.vue'
import SendSB from '~/components/Snackbar/SendSB.vue'
import ResetPassSB from '~/components/Snackbar/ResetPassSB.vue'

export default {
  components: {
    RecentCase,
    SendButton,
    SendSB,
    ResetPassSB,
  },
  mounted() {
    if (!this.$auth.loggedIn) {
      this.$router.push("/login");
    }
  },

  async fetch() {
     console.log(this.$auth.user.user.id)
  },
}
</script>
