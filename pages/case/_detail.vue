<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="9">
      <v-container>
        <CancelSB />
        <v-layout row>
          <v-col cols="12" xs="12" sm="6" md="6">
            <CaseInfo :id="id" :cases="caseInfo" />
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6">
            <ReceiverInfo />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12">
            <div v-if="$route.query.type == `Incident`">
              <IncidentDetail />
            </div>
            <div v-if="$route.query.type == `Request`">
              <RequestDetail />
            </div>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12">
            <CaseComment />
          </v-col>
        </v-layout>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CaseInfo from "~/components/case/detail/CaseInfo.vue";
import ReceiverInfo from "~/components/case/detail/ReceiverInfo.vue";
import IncidentDetail from "~/components/case/detail/IncidentDetail.vue";
import RequestDetail from "~/components/case/detail/RequestDetail.vue";
import CaseComment from "~/components/case/detail/CaseComment.vue";
import CancelSB from "~/components/Snackbar/CancelSB.vue";

export default {
  components: {
    CaseInfo,
    ReceiverInfo,
    IncidentDetail,
    RequestDetail,
    CaseComment,
    CancelSB
  },
  data() {
    return {
      id: "",
      cases: []
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
      getDataList: "case/getDataList",
      getDataInfo: "case/getInfo"
    }),
  },
  async fetch() {
    this.id = this.$route.params.detail;
    await this.getDataInfo({id: this.id});
    this.cases = this.caseInfo;
    console.log(this.caseInfo);
    console.log("cases : ",this.cases);
    console.log(this.$route);
    console.log(this.$route.params.detail);
  }
};
</script>
