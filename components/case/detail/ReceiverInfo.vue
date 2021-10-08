<template>
  <v-card class="pa-3">
      <div v-if="receivers.caseID == $route.params.detail">
        <v-card-title class="headline">
          <v-icon color="black">fa-user-check</v-icon>
          &ensp;Case Receiver's Information
        </v-card-title>
        <v-card-text class="subheading">
          <div class="text--primary pb-4">
            <strong>Name:</strong> &ensp;{{ receivers.firstName }} {{ receivers.lastName }}
          </div>
          <div class="text--primary pb-4">
            <strong>Email:</strong> &ensp;{{ receivers.email }}
          </div>
          <div class="text--primary pb-4">
            <strong>Phone No:</strong> &ensp;{{ receivers.phone }}
          </div>
          <div class="text--primary pb-4">
            <strong>Country:</strong> &ensp;
          </div>
          <div class="text--primary pb-4">
          </div>
        </v-card-text>
      </div>
  </v-card>
</template>

<script>
export default {
   props: {
    id: { type: String, default: "" },
    receivers: { type: Object, default: () => {} }
  },
  data() {
    return {
      // receivers: [
      //   {
      //     id: '20',
      //     name: '',
      //     email: '',
      //     phone: '',
      //     country: '',
      //     branch: '',
      //   },
      //   {
      //     id: '18',
      //     name: 'Teerapat Satitporn',
      //     email: 'example2@gmail.com',
      //     phone: '0823648557',
      //     country: 'Thailand',
      //     branch: 'Silom',
      //   },
      //   {
      //     id: '15',
      //     name: 'Teerapat Satitporn',
      //     email: 'example2@gmail.com',
      //     phone: '0823648557',
      //     country: 'Thailand',
      //     branch: 'Silom',
      //   },
      //   {
      //     id: '14',
      //     name: '',
      //     email: '',
      //     phone: '',
      //     country: '',
      //     branch: '',
      //   },
      //   {
      //     id: '13',
      //     name: 'Teerapat Satitporn',
      //     email: 'example2@gmail.com',
      //     phone: '0823648557',
      //     country: 'Thailand',
      //     branch: 'Silom',
      //   },
      // ],
    }
  },
}
</script>
