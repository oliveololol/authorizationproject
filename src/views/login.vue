<template>
  <!-- Налаштувати сесії -->
  <div class="wrapper">
    <header class="header"></header>
    <v-layout class="block" align-center justify-center v-if="status">
      <div class="login">
        <div class="login__container">
          <div class="login__content">
            <transition name="bounce" appear>
              <div class="login__form.form">
                <div class="form__header">
                  <h2 class="autorization">{{ a == 1 ? $t("registration") : $t("logIn") }}</h2>
                </div>

                <div class="from__content">
                  <div class="form__row back">
                    <input
                      v-model="email"
                      :label="$t('lblLogin')"
                      type="text"
                      color="succes"
                      :error-messages="EmailErrors"
                      input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                      class="justify-center form__input loginInput "
                      placeholder="Логін"
                    />
                    <div v-if="$v.email.$error" class="error-message ">
                      {{ $t("errorRequired") }}
                    </div>
                  </div>

                  <div class="form__row">
                    <input
                      v-model="password"
                      :label="$t('lblPassword')"
                      :type="showPassword ? 'text' : 'password'"
                      color="success"
                      readonly
                      onfocus="this.removeAttribute('readonly')"
                      v-on:keyup.enter="login"
                      :error-messages="PasswordErrors"
                      input="$v.password.$touch()"
                      @blur="$v.password.$touch()"
                      class="form__input loginInput"
                      placeholder="Пароль"
                    />
                    <span
                      class="btn-icon btn-icon-pass"
                      @click.stop="toggleShowPassword()"
                    >
                      <v-icon v-show="showPassword">mdi-eye</v-icon>
                      <v-icon v-show="!showPassword">mdi-eye-off</v-icon>
                    </span>
                    <div v-if="$v.password.$error" class="error-message ">
                      {{ $t("errorRequired") }}
                    </div>
                  </div>

                  <div class="form__actions">
                    <a href="/resetpass" class="btn btn-second">{{
                      $t("resetpass")
                    }}</a>
                    <button
                      block
                      class="btn btn-main loginBatton"
                      large
                      @click="login"
                    >
                      {{ $t("singIn") }}
                    </button>
                    <button class="reg btn-reg" @click="reg">
                    {{ $t("registration") }}
                  </button>
                  </div>
                  
                  <div class="form_reg">
                    <input
                      v-model="Name"
                      type="text"
                      color="succes"
                      input="$v.Name.$touch()"
                      class="justify-center form__input loginInput zxc"
                      placeholder="Ім'я"
                      @blur="$v.Name.$touch()"
                      :error-messages="PasswordErrors"
                      
                    />
                    <div v-if="$v.Name.$error" class="error-message vx xz">
                      {{ $t("errorRequired") }}
                    </div>
                    <input
                      v-model="SurName"
                      type="text"
                      color="succes"
                      input="$v.SurName.$touch()"
                      class="justify-center form__input loginInput zxc"
                      placeholder="Прізвище"
                      @blur="$v.SurName.$touch()"
                      :error-messages="PasswordErrors"
                    />
                    <div v-if="$v.SurName.$error" class="error-message vx xz">
                      {{ $t("errorRequired") }}
                    </div>
                    <button class="registration bak  btn-main" @click="unreg " >
                      {{ $t("atorization") }}
                    </button>
                    <button class="registration loginBatton ml-5 " @click="registration">
                      {{ $t("registration") }}
                    </button>
                  </div>
                  <div class="form__prompt">
                    <v-tooltip
                      top
                      color="error"
                      v-if="this.promptMessage == true"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <p class="form__promt-text">
                            {{ $t("formHint") }}
                          </p>
                          <span class="form__prompt-icon"></span>
                        </div>
                      </template>
                      <span> {{error ? error : $t("term2") }}</span>
                    </v-tooltip>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </v-layout>
    <v-layout align-center justify-center v-else>
      <v-flex xs12 sm8 md6>
        <v-sheet :elevation="12" class="sheet">
          <v-layout column pt-5 pb-5 align-center>
            <v-flex>
              <v-progress-circular
                :rotate="360"
                :size="150"
                :width="15"
                indeterminate
                color="indigo darken-2"
              />
            </v-flex>
            <v-flex mt-5>
              <span class="headline"
                >{{ $t("serverNotResponse") }}
                <span class="headline__timer">{{ time }}</span></span
              >
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService.js";
import StatusService from "@/services/StatusService";
import { required } from "vuelidate/lib/validators";
export default {
  name: "UserLogin",
  data() {
    return {
      // Обычный вход
      email: "",
      password: "",
      Name:"",
      SurName:"",
      error: null,
      promptMessage: false,
      showPassword: false,
      timerId: null,
      status: true,
      a:0,

      time: null,
      countTick: 0,
      timeID: null,
    };
  },
  methods: {
    reg() {
      const formActions = document.getElementsByClassName("form__actions")[0];
      const form_reg = document.getElementsByClassName("form_reg")[0];
      const reg = document.getElementsByClassName("reg")[0];
      
      formActions.style.display = "none";
      reg.style.display = "none";
      form_reg.style.display = "block";
      this.a=1;
    },
    unreg() {
      const formActions = document.getElementsByClassName("form__actions")[0];
      const form_reg = document.getElementsByClassName("form_reg")[0];
      const reg = document.getElementsByClassName("reg")[0];

      formActions.style.display = "flex";
      reg.style.display = "block";
      form_reg.style.display = "none";
      this.a =0;
    },
    async login() {
      try {
        this.$v.email.$touch();
        this.$v.password.$touch();
        if (!this.$v.email.$invalid && !this.$v.password.$invalid) {
          const response = await AuthenticationService.login({
            Login: this.email,
            Parol: this.password,
          });
          console.log(response.data);
          this.$store.dispatch("setToken", response.data.Token);
          let user = {
            Id: response.data.Id,
            Name: response.data.Name,
            Surname: response.data.Surname,
          };
          this.$store.dispatch("setUser", user);
          console.log(response.data);

          clearInterval(this.timerId);
          if (this.$route.query.redirect === undefined) {
            this.$router.replace({
              name: "logtable",
            });
          } else {
            this.$router.replace(this.$route.query.redirect);
          }
        }
      } catch (error) {
        this.error = error.error;
        this.promptMessage = true;
      }
    },

    clear() {
      this.email = "";
      this.password = "";
      this.error = null;
    },
    async check() {
      try {
        const result = await StatusService.checkStatus();
        if (result) this.status = true;
        else this.status = false;
      } catch (ex) {
        this.status = false;
      }
    },
    async registration() {
      try  {
        this.$v.email.$touch();
        this.$v.password.$touch();
        this.$v.Name.$touch();
        this.$v.SurName.$touch();
        if (!this.$v.email.$invalid && !this.$v.password.$invalid && !this.$v.Name.$invalid && !this.$v.SurName.$invalid) {
          const response = await AuthenticationService.registration({
            Login: this.email,
            Parol: this.password,
            SurName: this.SurName,
            Name: this.Name,
          });
          console.log(response);
          this.$store.dispatch("setToken", response.data.Token);
          let user = {
            Id: response.data.Id,
            Name: response.data.Name,
            Surname: response.data.Surname,
          };
          this.$store.dispatch("setUser", user);
          console.log(response.data);

          clearInterval(this.timerId);
          if (this.$route.query.redirect === undefined) {
            this.$router.replace({
              name: "logtable",
            });
          } 
        }
        }
       catch (error) {
        
        this.error = error;
        this.promptMessage = true;
        
      }
    },
    /**
     * Запуск таймера недоступности сервера
     * @param {Number} countTick
     */
    createDate(countTick) {
      this.time = new Date(0, 0, 0, 0, 0, countTick).toLocaleTimeString();
    },
    /**
     * Функция запуска таймера на выполнения
     */
    createTimeTimer() {
      this.timeID = setInterval(() => {
        this.countTick++;
        this.createDate(this.countTick);
      }, 1000);
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
  created() {
    this.check();
    this.createDate(0);
    this.timerId = setInterval(this.check, 6000);
  },
  computed: {
    EmailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t("errorRequired"));
      return errors;
    },
    PasswordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t("errorRequired"));
      return errors;
    },
    checkMode() {
      return process.env.VUE_APP_WORK_MODE === "internet" ? 1 : 0;
    },
  },
  validations: {
    email: { required },
    password: { required },
    Name: { required },
    SurName: { required }
  },
  watch: {
    status: function (value) {
      if (!value) this.createTimeTimer();
      else clearInterval(this.timeID);
    },
  },
};
</script>

<style scoped>
.sheet {
  max-width: 600px;
  margin: 300px auto 0;
  opacity: 0.7 !important;
  border-radius: 20px !important;
  background: #deeaf8 !important;
}
.headline {
  font-family: "Ubuntu", sans-serif !important;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  /* color: #0A083A; */
  text-align: center;
}
.headline__timer {
  display: block;
  font-family: "Ubuntu";
  font-weight: 500 !important;
  font-size: 25px !important;
  line-height: 29px;
  text-transform: uppercase;
  /* color: #0A083A;  */
  margin-top: 10px;
}
</style>
