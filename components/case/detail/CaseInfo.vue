<template>
  <v-card class="pa-3" v-if="cases.data">
    {{ cases.data }}

    <v-card-title class="headline">
      <v-icon color="black">fa-clipboard-list</v-icon>
      Case ID: {{ cases.data.caseID }}
      &ensp;
    </v-card-title>
    <v-card-text class="subheading">
      <div class="text--primary pb-4 text-h6">
        Type: &ensp;{{ cases.data.caseTypeID }}
      </div>
      <div class="text--primary pb-4 text-h6">
        Submit Date: &ensp;{{ cases.data.caseDate }}
      </div>
      <div class="text--primary pb-4 text-h6">
        Priority: &ensp;
        <v-chip :color="getPColor(cases.data.priorityID)">
          {{ getPName(cases.data.priorityID) }}
        </v-chip>
      </div>
      <div class="text--primary pb-4 text-h6">
        Status: &ensp;
        <v-chip :color="getSColor(cases.data.statusID)">
          {{ getSName(cases.data.statusID) }}
        </v-chip>
      </div>
    </v-card-text>
    <!-- {{ id }}
    {{ cases }}
    {{ caseInfo }} -->
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
  computed: {
    ...mapGetters({
      caseList: "case/list",
      caseInfo: "case/info"
    })
  },

  methods: {
    ...mapActions({
      getDataInfo: "case/getInfo"
    }),
    getPColor(priority) {
      if (priority === 1) return "error";
      else if (priority === 2) return "warning";
      else if (priority === "3") return "info";
    },
    getSColor(status) {
      if (status === 1) return "info";
      else if (status === 2) return "warning";
      else if (status === "3") return "success";
      else if (status === "4") return "error";
    },
    getPName(priority) {
      if (priority === 1) return "High";
      else if (priority === 2) return "Medium";
      else if (priority === "3") return "Low";
    },
    getSName(status) {
      if (status === 1) return "New Case";
      else if (status === 2) return "In Progress";
      else if (status === "3") return "Complete";
      else if (status === "4") return "Cancel";
    }
  }
  // async mounted() {
  //   await this.getDataInfo({ id });
  //   this.cases.caseID = this.caseInfo.data.caseID;
  // },
};
</script>
