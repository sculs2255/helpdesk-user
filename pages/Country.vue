
<template>
  <div>
    <v-card class="pa-3">
      {{user.phoneNumber}}
      <v-card-title v-if="isDisabled == false" class="text-h4 justify-center">Incident Case Form</v-card-title>
      <v-card-title v-if="isDisabled == true" class="text-h4 justify-center">Submit Incident Form</v-card-title>
      <v-form ref="form" v-model="valid" :disabled="isDisabled" lazy-validation>
        <v-card-title class="headline">
          <v-icon color="black">fa-user</v-icon>&ensp;Case Informer
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
             <v-col cols="12" xs="8" sm="8" md="8">
              <v-text-field
                v-model="form.users"
                item-value="id"
                item-text="firstName"
                :items="userList.data"
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








      </v-form>
    </v-card>
  </div>
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
      userList:"user/list",

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




    ...mapActions({

      getDataListUs: "user/getDataList",

    }),

     async getListUser() {
      this.filter.sortOrder = "code";
      this.filter.pageSize = 1000;
      this.filter.pageNumber = 1;
      this.loading_dts = true;
      await this.getDataListUs(this.filter);
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

  },



};
</script>
