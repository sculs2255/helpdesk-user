<template>
  <v-row justify="center" align="center">
    {{ caseList }}
    <v-col cols="12" sm="12" md="12">
      <v-container>
        <CancelSB />
        <v-card>
          <v-card-title class="justify-center">
            <div class="text-h4 pl-2">Your Sent Case</div>
          </v-card-title>
          <v-card-text>
            <v-row wrap>
              <v-col cols="12" xs="12" sm="4" md="3">
                <v-autocomplete label="Search By" clearable></v-autocomplete>
              </v-col>
              <v-col cols="12" xs="12" sm="8" md="9">
                <v-autocomplete
                  append-icon="fa-search"
                  label="Search"
                  single-line
                  clearable
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>

          <v-data-table
            :loading="loading_dts"
            :headers="headers"
            :items="caseList.data"
            :options.sync="optionDataTables"
            :server-items-length="caseList.totalItems"
            sort-by="id"
            class="datatable-listing-app"
          >
            <template #[`item.button`]="{ item }">
              <v-btn
                fab
                x-small
                color="info"
                @click="ClickDetail(item.caseID, item.caseTypeID)"
              >
                <v-icon>fa-clipboard-list</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
import CancelSB from "~/components/Snackbar/CancelSB.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    CancelSB
  },
  data() {
    return {
      filter: {
        textSearch: "",
        pageSize: 10,
        pageNumber: 0,
        caseTypeID: 0
      },
      optionDataTables: {},
      loading_dts: false,
      headers: [
        { text: "Case ID", value: "caseID" },
        { text: "Type", value: "caseTypeID" },
        { text: "Topic", value: "topic" },
        {
          text: "Submit Date",
          value: "caseDate",

          sortable: false
        },
        { text: "Informer", value: "informer" },
        { text: "Receiver", value: "receiver" },
        { text: "Priority", value: "priorityID" },
        { text: "Status", value: "statusID" },
        {
          text: "Details / Cancel Case",
          value: "button",

          sortable: false
        }
      ]
    };
  },
  watch: {
    optionDataTables: {
      handler() {
        this._getDataList();
      }
    },
    deep: true
  },
  computed: {
    ...mapGetters({
      caseList: "case/list"
    })
  },
  methods:
  {
    ...mapActions({
      getDataList: "case/getDataList"
    }),
    async _getDataList() {
      const { page, itemsPerPage, sortBy, sortDesc } = this.optionDataTables;
      this.filter.sortOrder = sortBy;
      if (sortDesc == "true") {
        this.filter.sortOrder = sortBy + "_desc";
      }
      this.filter.pageSize = itemsPerPage;
      this.filter.pageNumber = page;
      this.loading_dts = true;
      await this.getDataList(this.filter);
      this.loading_dts = false;
    },
    ClickDetail(caseID, caseTypeID) {
      this.$router.push({
        name: "case-detail",
        params: {
          detail: caseID
        },
        query: {
          type: caseTypeID
        }
      });
    }
  },
  async fetch() {
    console.log(this.$route);
  }
};
</script>
