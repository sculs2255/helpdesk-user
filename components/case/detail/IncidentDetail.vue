<template>
  <v-card class="pa-3">
    <div >
      <div v-if="cases.caseID == $route.params.detail">
        <v-card-title class="headline">
          <v-icon color="black">fa-user</v-icon>
          &ensp;Case Informer
        </v-card-title>
        <v-card-text class="subheading">
          <div class="text--primary pb-4">
            <strong>Name:</strong> &ensp;{{ informers.firstName}} {{ informers.lastName}}
          </div>
        </v-card-text>
        <v-card-title class="headline">
          <v-icon color="black">fa-map-marker-alt</v-icon>
          &ensp;Current Workplace
        </v-card-title>
        <v-card-text class="subheading">
          <div class="text--primary pb-4">
            <strong>WorkplaceID:</strong> &ensp;{{ informers.workplaceID }}
          </div>

        </v-card-text>
        <v-card-title class="headline">
          <v-icon color="black">fa-file-alt</v-icon>
          &ensp;Incident Form
        </v-card-title>
        <v-card-text class="subheading">
          <div class="text--primary pb-4">
            <strong>System:</strong> &ensp;{{ cases.systemID }}
          </div>
          <div class="text--primary pb-4">
            <strong>Module:</strong> &ensp;{{ cases.moduleID }}
          </div>
          <div class="text--primary pb-4">
            <strong>Program ID:</strong> &ensp;{{ cases.programID }}
          </div>
          <div class="text--primary pb-4">
            <strong>Topic:</strong> &ensp;{{ cases.topic }}
          </div>
          <div class="text--primary pb-4">
            <strong>Description:</strong> &ensp;{{ cases.description }}
          </div>
          <div v-if="cases.file != null" class="text--primary pb-4">
            <v-icon>fa-paperclip</v-icon>
            &nbsp;<strong>File:</strong> &ensp;
            <v-chip v-for="file in cases.file" :key="file" color="gray">
              {{ file }}
            </v-chip>
          </div>
          <div v-if="cases.note != ''" class="text--primary pb-4">
            <v-icon>far fa-sticky-note</v-icon>
            &nbsp;<strong>Note:</strong> &ensp;{{ cases.note }}
          </div>
          <div v-if="cases.ccMail != '' " class="text--primary pb-4">
            <v-icon>far fa-envelope</v-icon>
            &nbsp;<strong>CC Mail:</strong> &ensp;
            <v-chip  color="gray">
              {{ cases.ccMail }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-dialog v-model="cdialog" width="600">
            <template #activator="{ on, attrs }">
              <v-btn
                v-if="cases.statusID == '1'"
                slot="activator"
                color="error"
                v-bind="attrs"
                v-on="on"
              >
                Cancel Case
                <v-icon right>fa-ban</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline justify-center">
                Do you want to cancel this case?
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn color="info" @click="cdialog = false">
                  No
                  <v-icon right>fa-times</v-icon>
                </v-btn>
                <v-btn color="error" @click="cancel(item)">
                  Yes
                  <v-icon right>fa-check</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
   props: {
    id: { type: String, default: "" },
    cases: { type: Object, default: () => {} },
    informers: { type: Object, default: () => {} }

  },
  data() {
    return {
      // Data
      // details: [
      //   {
      //     id: '20',
      //     name: 'Teerapat Satitporn',
      //     country: 'Thailand',
      //     branch: 'Silom',
      //     department: 'IT',
      //     system: '',
      //     module: '',
      //     pid: '',
      //     topic: '',
      //     description: '',
      //     file: null,
      //     note: '',
      //     ccmail: null,
      //     status: '1',
      //     cdialog: false,
      //   },
      //   {
      //     id: '15',
      //     name: 'Teerapat Satitporn',
      //     country: 'Thailand',
      //     branch: 'Silom',
      //     department: 'IT',
      //     system: '',
      //     module: '',
      //     pid: '',
      //     topic: '',
      //     description: '',
      //     file: ['image3.png'],
      //     note: '',
      //     ccmail: ['example3@gmail.com', 'example4@gmail.com'],
      //     status: '3',
      //     cdialog: false,
      //   },
      //   {
      //     id: '13',
      //     name: 'Teerapat Satitporn',
      //     representor: '',
      //     country: 'Thailand',
      //     branch: 'Silom',
      //     department: 'IT',
      //     system: '',
      //     module: '',
      //     pid: '',
      //     topic: '',
      //     description: '',
      //     file: null,
      //     note: '',
      //     ccmail: null,
      //     status: '4',
      //     cdialog: false,
      //   },
      // ],
    }
  },
  computed: {
    CancelSB: {
      get() {
        return this.$store.state.snackbar.CancelSB
      },
      set(val) {
        this.$store.dispatch('snackbar/setCancelSB', val, { root: true })
      },
    },
  },
  methods: {
    cancel(item) {
      item.cdialog = false
      this.CancelSB = true
    },
  },
}
</script>
