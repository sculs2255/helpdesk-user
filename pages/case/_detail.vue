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
            <ReceiverInfo
              :id="id"
              :cases="caseInfo"
              :receivers="receiverInfo"
              v-if="receiverInfo != null"
            />
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12">
            <div>
              <IncidentDetail
                :id="id"
                :cases="caseInfo"
                v-if="$route.query.type == 1"
              />
            </div>
            <div>
              <RequestDetail
                :id="id"
                :cases="caseInfo"
                v-if="$route.query.type == 2"
              />
            </div>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12">
            <CaseComment :id="id" :cases="caseInfo" :comments="commentInfo" />
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
      cases: [],
      receivers: [],
      comments: {}
    };
  },
  computed: {
    ...mapGetters({
      caseInfo: "case/info",
      receiverInfo: "receiver/info",
      commentInfo: "comment/info"
    })
  },
  methods: {
    ...mapActions({
      getDataInfo: "case/getInfo",
      getDataReceiverInfo: "receiver/getInfo",
      getDataCommentInfo: "comment/getInfo"
    })
  },
  async fetch() {
    this.id = this.$route.params.detail;

    await this.getDataInfo({ id: this.id });
    await this.getDataReceiverInfo({ id: this.id });
    await this.getDataCommentInfo({ id: this.id });
    this.cases = this.caseInfo;
    this.receivers = this.receiverInfo;
    this.comments = this.commentInfo;

    console.log("Comment : ", this.commentInfo);
    console.log("Comment : ", this.comments);
    console.log("GetComment : ", this.getDataCommentInfo);

    console.log("ReceiverInfo : ", this.receiverInfo);
    console.log("receivers : ", this.receivers);

    console.log("caseInfo : ", this.caseInfo);
    console.log("cases : ", this.cases);
    console.log(this.$route);
    console.log("ID : ", this.$route.params.detail);
    console.log("Type : ", this.$route.query.type);
  }
};
</script>
