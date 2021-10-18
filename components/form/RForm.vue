<template>
  <v-card class="pa-3">
    <v-card-title v-if="isDisabled == false" class="text-h4 justify-center">
      Request Case Form
    </v-card-title>
    <v-card-title v-if="isDisabled == true" class="text-h4 justify-center">
      Submit Request Form
    </v-card-title>
    <v-form ref="form" v-model="valid" :disabled="isDisabled" lazy-validation>
      <v-card-title class="headline">
        <v-icon color="black">fa-user</v-icon>
        &ensp;Case Informer
      </v-card-title>
      <v-card-text class="subheading">
       <v-row wrap>
            <v-col cols="12" xs="8" sm="8" md="8">
              <v-text-field
                v-model="form.user"
                item-value="id"
                item-text="firstName"
                label="Full Name *"
                :rules="[rules.required]"
                readonly
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="4" sm="4" md="4">
              <v-dialog v-model="sdialog" persistent width="600">
                <template #activator="{ on, attrs }">
                  <v-btn
                    slot="activator"
                    color="info"
                    :disabled="isDisabled"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>fa-search</v-icon>Search Name
                  </v-btn>
                </template>
                <v-card>
                  <v-form ref="search">
                    <v-card-title class="headline justify-center">Search Informer Name</v-card-title>
                    <v-card-text>
                      <v-autocomplete
                        v-model="name"
                        :rules="[rules.required]"
                        item-text="firstName"
                        item-value="id"
                        :items="userList.data"
                        label="Full Name *"
                        prepend-icon="fa-user"
                        required
                        clearable
                      ></v-autocomplete>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="error" text @click="cancel">Cancel</v-btn>
                      <v-spacer />
                      <v-btn color="success" @click="selectName">
                        Select
                        <v-icon right>fa-check</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
      </v-card-text>
     <v-card-title class="headline">
          <v-icon color="black">fa-edit</v-icon>&ensp;Work Place
        </v-card-title>
         <v-card-text class="subheading">
          <v-row wrap>
            <v-col cols="12" xs="8" sm="8" md="8">
              <v-text-field
                v-model="form.workplace"
                item-value="workplaceID"
                item-text=" departmentName"
                label="WorkPlace *"
                :rules="[rules.required]"
                readonly
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" xs="4" sm="4" md="4">
              <v-dialog v-model="adialog" persistent width="600">
                <template #activator="{ on, attrs }">
                  <v-btn
                    slot="activator"
                    color="info"
                    :disabled="isDisabled"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>fa-search</v-icon>Search Workplace
                  </v-btn>
                </template>
                <v-card>
                  <v-form ref="search">
                    <v-card-title class="headline justify-center">Search Workplace</v-card-title>
                    <v-card-text>
                      <v-autocomplete
                        v-model="namecountry"
                        :rules="[rules.required]"
                        item-text="countryName"
                        item-value="countryName"
                        :items="workplaceList.data"
                        label="Workplace Country*"
                        prepend-icon="fa-edit"
                        required
                        clearable
                      ></v-autocomplete>
                      <v-autocomplete
                        v-model="namebranch"
                        :rules="[rules.required]"
                        item-text="branchName"
                        item-value="branchName"
                        :items="workplaceList.data"
                        label="Workplace Branch*"
                        prepend-icon="fa-edit"
                        required
                        clearable
                      ></v-autocomplete>
                        <v-autocomplete
                        v-model="nameworkplace"
                        :rules="[rules.required]"
                        item-text="departName"
                        item-value="departName"
                        :items="workplaceList.data"
                        label="Workplace Department*"
                        prepend-icon="fa-edit"
                        required
                        clearable
                      ></v-autocomplete>

                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="error" text @click="cancelwork">Cancel</v-btn>
                      <v-spacer />
                      <v-btn color="success" @click="select">
                        Select
                        <v-icon right>fa-check</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
         </v-card-text>
      <v-card-text class="subheading">
        <v-autocomplete
            v-model="form.systemID"
            item-value="systemID"
            item-text="systemName"
            :items="hdsystemList.data"
            label="System *"
            required
            @change="systemf"
            clearable
          ></v-autocomplete>
       <v-autocomplete
            v-model="form.topicID"
            item-value="topicID"
            item-text="topicName"
            :items="topicList.data"
            label="Topic*"
            required
            clearable
          ></v-autocomplete>
        <v-textarea
          v-model="form.description"
          label="Description *"
          :rules="[rules.required]"
          required
        ></v-textarea>
        <v-radio-group
          v-model="form.priorityID"
          label="Priority *"
          row
          :rules="[rules.required]"
          required
        >
          <v-radio label="High" color="error" value="1"></v-radio>
          <v-radio label="Medium" color="warning" value="2"></v-radio>
          <v-radio label="Low" color="info" value="3"></v-radio>
        </v-radio-group>
        <v-file-input
          v-model="form.file"
          chips
          multiple
          label="File (Optional)"
          prepend-icon="fa-paperclip"
        ></v-file-input>
        <v-textarea
          v-model="form.note"
          label="Note (Optional)"
          prepend-icon="far fa-sticky-note"
          rows="2"
        ></v-textarea>
        <v-textarea
          v-model="form.ccmail"
          label="CC Mail (Optional)"
          prepend-icon="far fa-envelope"
          rows="1"
          hint="Use , for more than one cc mail"
          persistent-hint
        ></v-textarea>
      </v-card-text>
      <v-card-actions v-if="isDisabled == false" class="justify-center">
        <v-btn :disabled="!valid" color="success" @click="submit">
          Submit
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else class="justify-center">
        <v-btn color="error" @click="isDisabled = false">
          Edit
          <v-icon right>fa-pencil-alt</v-icon>
        </v-btn>
        <v-btn color="primary" @click="send">
          Send
          <v-icon right>fa-paper-plane</v-icon>
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      // Data
      filter: {
        textSearch: "",
        pageSize: 10,
        pageNumber: 0,
        countryID: 0,
        systemID: 0
      },
        user: "",
        priorityID: "",
        systemID: "",
        moduleID: "",
        programID: "",
        topic: "",
        description: "",
        file: null,
        note: "",
        ccmail: "",
      form: {
        user: "",
        caseTypeID: 1,
        priorityID: "",
        statusID: 1,
        systemID: "",
        moduleID: "",
        programID: "",
        topic: "",
        description: "",
        file: null,
        note: "",
        ccmail: ""
      },
      // Search
      namesearch: "",
      // SearchList: [
      //   {
      //     name: "Teerapat Satitporn"
      //   },
      //   {
      //     name: "John Doe"
      //   },
      //   {
      //     name: "John Smith"
      //   }
      // ],
      // List

      // Command
      sdialog: false,
      adialog: false,
      valid: true,
      isDisabled: false,
      rules: {
        required: value => !!value || "This field is required."
      }
    };
  },

  computed: {

    ...mapGetters({
      countryList: "country/list",
      branchList: "branch/list",
      departmentList: "department/list",
      hdsystemList: "hdsystem/list",
      moduleList: "module/list",
      userList:"user/list",
      workplaceList :"workplace/list",
      topicList :"topic/list"

    }),
    SendSB: {
      get() {
        return this.$store.state.snackbar.SendSB;
      },
      set(val) {
        this.$store.dispatch("snackbar/setSendSB", val, { root: true });
      }
    },
    ValidateSB: {
      get() {
        return this.$store.state.snackbar.ValidateSB;
      },
      set(val) {
        this.$store.dispatch("snackbar/setValidateSB", val, { root: true });
      }
    },
    SubmitSB: {
      get() {
        return this.$store.state.snackbar.SubmitSB;
      },
      set(val) {
        this.$store.dispatch("snackbar/setSubmitSB", val, { root: true });
      }
    }
  },

  methods: {
    systemf: function(systemID) {
      this.getListModule(systemID);
    },

    // modulef(moduleID){
    // this.getListHdsystem(moduleID)
    //},

    ...mapActions({
      getDataList: "country/getDataList",
      getDataListbr: "branch/getDataList",
      getDataListde: "department/getDataList",
      getDataListhd: "hdsystem/getDataList",
      getDataListmo: "module/getDataList",
      getDataListUs: "user/getDataList",
      getDataListwo:"workplace/getDataList",
      getDataListto:"topic/getDataList"
    }),
      async getListTopic() {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.loading_dts = true;
      await this.getDataListto(this.filter);
      this.loading_dts = false;
    },
      async getListWorkplace() {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.loading_dts = true;
      await this.getDataListwo(this.filter);
      this.loading_dts = false;
    },
     async getListUser() {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.loading_dts = true;
      await this.getDataListUs(this.filter);
      this.loading_dts = false;
    },
    async getListModule(systemID) {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.filter.systemID = systemID;
      this.loading_dts = true;
      await this.getDataListmo(this.filter);
      this.loading_dts = false;
    },
    async getListBranch(countryID) {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.filter.countryID = countryID;
      this.loading_dts = true;
      await this.getDataListbr(this.filter);
      this.loading_dts = false;
    },
    async getListHdsystem() {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.loading_dts = true;
      await this.getDataListhd(this.filter);
      this.loading_dts = false;
    },
    async getListDepartment() {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.loading_dts = true;
      await this.getDataListde(this.filter);
      this.loading_dts = false;
    },
    async getListCountry() {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.loading_dts = true;
      await this.getDataList(this.filter);
      this.loading_dts = false;
    },

    async submit() {
      if (this.$refs.form.validate()) {
        this.isDisabled = true;

        await this.$store
          .dispatch("case/create", this.form)
          .then(response => {
            // Action Success
            // this.$vuetify.goTo(10, 1000)
            // this.SubmitSB = true
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$vuetify.goTo(400, 1000);
        this.ValidateSB = true;
      }
    },
    selectName() {
      if (this.$refs.search.validate()) {
        this.form.user = this.name;

        this.sdialog = false;
        this.$refs.search.reset();
      }
    },
    select() {
      if (this.$refs.search.validate()) {
        // this.form.workplace = this.nameworkplace;
        // this.form.workplace = this.namecountry;
        // this.form.workplace = this.namebranch;
         this.form.workplace = this.namebranch +" / "+ this.nameworkplace + " / " +this.namecountry;

        this.adialog = false;
        this.$refs.search.reset();
      }
    },
    cancel() {
      this.sdialog = false;
      this.$refs.search.reset();
    },
    cancelwork() {
      this.adialog = false;
      this.$refs.search.reset();
    },

    send() {
      this.SendSB = true;
      this.$router.push({
        name: "index"
      });
    }
  },



  async fetch() {
    await this.getListUser();
    await this.getListCountry();
    //await this.getListBranch(0);
    await this.getListDepartment();
    await this.getListHdsystem();
    //await this.getListModule(0);
     await this.getListWorkplace();
     await this.getListTopic();
  },

  SendSB: {
    get() {
      return this.$store.state.snackbar.SendSB;
    },
    set(val) {
      this.$store.dispatch("snackbar/setSendSB", val, { root: true });
    }
  },
  ValidateSB: {
    get() {
      return this.$store.state.snackbar.ValidateSB;
    },
    set(val) {
      this.$store.dispatch("snackbar/setValidateSB", val, { root: true });
    }
  },
  SubmitSB: {
    get() {
      return this.$store.state.snackbar.SubmitSB;
    },
    set(val) {
      this.$store.dispatch("snackbar/setSubmitSB", val, { root: true });
    }
  }

  /*methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.isDisabled = true

        await this.$store
          .dispatch("case/create", this.form)
          .then((response) => {
            // Action Success
            // this.$vuetify.goTo(10, 1000)
            // this.SubmitSB = true
          })
          .catch((error) => {
            console.log(error);
          });

      } else {
        this.$vuetify.goTo(400, 1000)
        this.ValidateSB = true
      }
    },
    select() {
      if (this.$refs.search.validate()) {
        this.name = this.namesearch
        for (const i in this.SearchList) {
          if (this.SearchList[i].name === this.namesearch) {
            this.country = this.SearchList[i].country
            this.branchname = this.SearchList[i].branchname
            this.department = this.SearchList[i].department
          }
        }
        this.sdialog = false
        this.$refs.search.reset()
      }
    },
    cancel() {
      this.sdialog = false
      this.$refs.search.reset()
    },
    send() {
      this.SendSB = true
      this.$router.push({
        name: 'index',
      })
    },
  },*/
};
</script>
