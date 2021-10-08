<template>
  <v-row justify="center" align="center">
    <v-col cols="4 text-center" >
      <v-container>
      <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submit()"
          autocompete="new"
          class=" mx-10"
          autocomplete="off"
        >
          <v-row>
            <v-col>
              <v-text-field
                v-model="member.email"
                :rules="requireRules"
                outlined
                label="ชื่อเข้าใช้งาน"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            autocomplete="off"
            :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="requireRules"
            :type="show_pwd ? 'text' : 'password'"
            name="input-10-2"
            label="รหัสผ่าน"
            outlined
            v-model="member.password"
            class="input-group--focused"
            @click:append="show_pwd = !show_pwd"
          ></v-text-field>

          <v-row v-if="loginFail === true">
            <v-col cols="12">
              <v-alert
                border="left"
                color="red accent-4"
                type="error"
                elevation="2"
                text
                outlined
                icon="mdi-alert-rhombus"
              >
                เกิดข้อผิดผลาด ไม่สามารถเข้าระบบได้กรุณากรอกใหม่อีกครั้ง
              </v-alert>
            </v-col>
          </v-row>

          <v-alert dense outlined type="error" v-if="alert_errors !== null">
            <div v-for="(error, index) in alert_errors" :key="'error_' + index">
              {{ error }}
            </div>
            เกิดข้อผิดผลาด ไม่สามารถเข้าระบบได้กรุณากรอกใหม่อีกครั้ง
          </v-alert>

          <v-row>
            <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12 pa-0">
              <v-btn
                type="submit"
                class="my-5 btn-hover color-5"

                :loading="loading"
                depressed
                rounded
              >
                LOGIN
              </v-btn>
            </div>
            <div class="col-xl-6 col-md-6 col-sm-12 col-xs-12 pa-0">
              <v-btn
                type="button"
                class="my-5 btn-hover color-11"

                depressed
                rounded
                @click="$emit('clickCancel')"
              >
                CANCEL
              </v-btn>
            </div>
          </v-row>

          <div class="red--text text-center" v-if="error_msg != ''">
            {{ error_msg }}
          </div>
          <v-col cols="12">
            <hr />
          </v-col>


        </v-form>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>

export default {
  layout: "blank",
    data() {
    return {
      loading: false,
      show_pwd: false,
      valid: true,
      loginFail: false,
      alert_errors: null,
      checkLogin: false,
      requireRules: [(v) => !!v || "กรุณากรอกข้อมูล"],
      member: {
        email: "user@user.com",
        password: "hD1234#",
      },
      error_msg: "",
    };
  },
  methods: {
    linkPage(path) {
      this.$router.replace(path).catch(() => {});
    },
    async submit() {
      this.status = null;
      this.error_msg = "";
      if (this.$refs.form.validate()) {
        var form_data = new FormData();
        for (var key in this.member) {
          form_data.append(key, this.member[key]);
        }
        let _self = this;
        _self.loading = true;
        try {
          const auth = await this.$auth.loginWith("local", { data: form_data });
          if (auth.data.error) {
            this.error_msg = auth.data.error_description;
            await this.$auth.logout();
          } else {
              window.location = "/";
          }
        } catch (error) {
          this.alert_errors = error.response.data.errors;
          await this.$auth.logout();
        }
        _self.loading = false;
      }
    },
  },
}
</script>
