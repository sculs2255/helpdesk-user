<template>
  <v-card class="pa-3" v-if="cases">
    
    <v-card-title class="headline">
      <v-icon color="black">fa-clipboard-list</v-icon>
      &ensp; Case ID:{{ cases.caseID }}
    </v-card-title>
    <v-card-text class="subheading">
      <div class="text--primary pb-4 text-h6">
        Type: &ensp;{{ getTName(cases.caseTypeID) }}
      </div>
      <div class="text--primary pb-4 text-h6">
        Submit Date: &ensp;{{ cases.caseDate }}
      </div>
      <div class="text--primary pb-4 text-h6">
        Priority: &ensp;
        <v-chip :color="getPColor(cases.priorityID)">
          {{ getPName(cases.priorityID) }}
        </v-chip>
      </div>
      <div class="text--primary pb-4 text-h6">
        Status: &ensp;
        <v-chip :color="getSColor(cases.statusID)">
          {{ getSName(cases.statusID) }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: String, default: "" },
    cases: { type: Object, default: () => {} }
  },
  data() {
    return {
      // casese: [
      //   {
      //     CaseID: this.cases.caseID,
      //      //CaseID: this.cases.caseID,
      //     type: "",
      //     date: "",
      //     priority: "",
      //     status: "",
      //   }
      // ]
    };
  },

  methods: {
    getPColor(priority) {
      if (priority === 1) return "error";
      else if (priority === 2) return "warning";
      else if (priority === 3) return "info";
    },
    getSColor(status) {
      if (status === 1) return "info";
      else if (status === 2) return "warning";
      else if (status === 3) return "success";
      else if (status === 4) return "error";
    },
    getPName(priority) {
      if (priority === 1) return "High";
      else if (priority === 2) return "Medium";
      else if (priority === 3) return "Low";
    },
    getSName(status) {
      if (status === 1) return "New Case";
      else if (status === 2) return "In Progress";
      else if (status === 3) return "Complete";
      else if (status === 4) return "Cancel";
    },
    getTName(caseTypeID) {
      if (caseTypeID === 1) return "Incident";
      else return "Request";
    }
  }
  // async mounted() {
  //   await this.getDataInfo({ id });
  //   this.cases.caseID = this.caseInfo.data.caseID;
  // },
};
</script>
