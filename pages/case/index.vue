<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="12" md="12">
      <v-container>
        <CancelSB />

{{ caseList }}
  <v-card>
    <v-card-title class="justify-center">
      <div class="text-h4 pl-2">Your Sent Case</div>
    </v-card-title>
    <v-card-text>
      <v-row wrap>
        <v-col cols="12" xs="12" sm="4" md="3">
          <v-autocomplete

            label="Search By"
            clearable
          ></v-autocomplete>
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

    </v-data-table>
  </v-card>

      </v-container>
    </v-col>
  </v-row>
</template>
<script>
import CancelSB from '~/components/Snackbar/CancelSB.vue'
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    CancelSB,
  },
   data() {
    return {
      filter: {
        textSearch: "",
        pageSize: 0,
        pageNumber: 1,
        caseTypeID: 0
      },
      optionDataTables: {},
      loading_dts: false,
      headers: [
        { text: 'Case ID', value: 'caseID', filterable: false },
        { text: 'Type', value: 'caseTypeID', filterable: false },
        { text: 'Topic', value: 'topic', filterable: false },
        {
          text: 'Submit Date',
          value: 'caseDate',
          filterable: false,
          sortable: false,
        },
        { text: 'Informer', value: 'informer', filterable: false },
        { text: 'Receiver', value: 'receiver', filterable: false },
        { text: 'Priority', value: 'priorityID', filterable: false },
        { text: 'Status', value: 'statusID', filterable: false },
        {
          text: 'Details / Cancel Case',
          value: 'button',
          filterable: false,
          sortable: false,
        },
      ],
    }
   },
   computed: {
    ...mapGetters({
      caseList: "case/list",
    })
  },
  watch: {

  },
  methods: {
    ...mapActions({
      getDataList: "case/getDataList",
    }),
    _getDataList(){
        this.getDataList(this.filter);
    }
  },
  async created() {
     await this._getDataList();
  },
}
</script>
