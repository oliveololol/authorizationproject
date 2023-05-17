<template>
  <!-- Налаштувати сесії -->
  <div class="wrapper">
    <header class="header">
      <!-- <div class="header__container">
        <a href="#" class="header__logo"
          ><img
            src="../assets/icons/logo-full.svg"
            alt="Logo"
            class="logo-img"
          /><span class="logo-text">TMS</span></a
        >
      </div> -->
    </header>
    <v-layout align-center justify-center v-if="status">
      <div class="login">
        <div class="login__container">
          <div class="login__content">
            <transition name="bounce" appear>
              <div class="login__form form">
                <div class="form__header">
                  <h2>{{ $t('logIn') }}</h2>
                </div>
                <div class="from__content">
                  <div class="form__row">
                    <span class="icon-login">login</span>
                    <input
                      v-model="email"
                      :label="$t('lblLogin')"
                      type="text"
                      color="success"
                      :error-messages="EmailErrors"
                      input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                      class="form__input loginInput"
                      placeholder="Логін"
                    />
                    <div v-if="$v.email.$error" class="error-message">{{ $t('errorRequired') }}</div>
                    <!-- <span 
                      class="form__hint"
                      :class="{_prompt : promptMessage}"
                    >{{ $t('formHint') }}</span>
                    <v-tooltip right color="error">
                      <template v-slot:activator="{ on, attrs }">
                        <span 
                          v-bind="attrs" 
                          v-on="on" 
                          class="form__hint-icon"
                          :class="{_prompt : promptMessage}"
                        >
                        </span>
                      </template>
                      <span>{{ $t('term2') }}</span>
                    </v-tooltip> -->
                  </div>
    
                  <div class="form__row">
                    <span class="icon-pass">password</span>
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
                    <span class="btn-icon btn-icon-pass" @click.stop="toggleShowPassword()">
                      <v-icon v-show="showPassword" color="indigo darken-4">visibility</v-icon>
                      <v-icon v-show="!showPassword" color="#8B8B8B">visibility_off</v-icon>
                    </span>
                    <div v-if="$v.password.$error" class="error-message">{{ $t('errorRequired') }}</div>
                  </div>
    
                  <div class="form__actions">
                    <a href="/editpass" class="btn btn-second">{{
                      $t('editPass')
                    }}</a>
                    <button
                      block
                      class="btn btn-main loginBatton"
                      large
                      @click="login"
                    >
                      {{ $t('singIn') }}
                    </button>
                  </div>
                  <div class="form__prompt">
                      <v-tooltip top color="error" v-if="error">
                        <template v-slot:activator="{ on, attrs }">
                          <div v-bind="attrs" v-on="on">
                              <p class="form__promt-text">
                                {{ $t('formHint') }}
                              </p>
                              <span class="form__prompt-icon"></span>
                          </div>
                        </template>
                        <span>{{ $t('term2') }}</span>
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
              <span class="headline">{{$t('serverNotResponse')}} <span class="headline__timer">{{time}}</span></span>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js';
import StatusService from '@/services/StatusService';
import { required } from 'vuelidate/lib/validators';
export default {
    name:'UserLogin',
  data() {
    return {
      // Обычный вход
      email: '',
      password: '',
      error: null,
      promptMessage: false,
      showPassword: false,
      // activeTab: 0, // активный таб
      // // гость
      // gEmail: '',
      // gPassword: '',
      // gFIO: '',
      // gError: null,
      timerId: null,
      status: true,

      time: null,
      countTick: 0,
      timeID: null,
    };
  },
  methods: {
    async login() {
      try {
        this.$v.email.$touch();
        this.$v.password.$touch();
        if (!this.$v.email.$invalid && !this.$v.password.$invalid) {
          const response = await AuthenticationService.login({
            email: this.email,
            password: this.password,
          });
          this.$store.dispatch('setToken', response.data.token);
          this.$store.dispatch('setUser', response.data.user);
          clearInterval(this.timerId);
          if (this.$route.query.redirect === undefined) {
            this.$router.replace({
              name: 'home',
            });
          } else this.$router.replace(this.$route.query.redirect);
        }
      } catch (error) {
        this.error = error.error;
        this.promptMessage = true;
      }
    },
    // async gLogin() {
    //   try {
    //     this.$v.gEmail.$touch();
    //     this.$v.gPassword.$touch();
    //     this.$v.gFIO.$touch();
    //     if (
    //       !this.$v.gEmail.$invalid &&
    //       !this.$v.gPassword.$invalid &&
    //       !this.$v.gFIO.$invalid
    //     ) {
    //       const response = await AuthenticationService.gLogin({
    //         gEmail: this.gEmail,
    //         gPassword: this.gPassword,
    //         gFIO: this.gFIO,
    //       });
    //       this.$store.dispatch('setToken', response.data.token);
    //       this.$store.dispatch('setUser', response.data.user);

    //       clearInterval(this.timerId);

    //       this.$router.replace({
    //         name: 'home',
    //       });
    //     }
    //   } catch (error) {
    //     this.gError = error.error;
    //   }
    // },
    clear() {
      this.email = '';
      this.password = '';
      this.error = null;

      // this.gEmail = '';
      // this.gPassword = '';
      // this.gFIO = '';
      // this.gError = null;
      // this.$v.$reset();
    },
    async check() {
      try {
        const result = (await StatusService.checkStatus()).data;
        if (result.status) this.status = true;
        else this.status = false;
      } catch (ex) {
        this.status = false;
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
    toggleShowPassword(){
      this.showPassword = !this.showPassword;
    },
  },
  created() {
    this.check();
    this.createDate(0);
    this.timerId = setInterval(this.check, 6000);
  },
  computed: {
    // gFIOErrors() {
    //   const errors = [];
    //   if (!this.$v.gFIO.$dirty) return errors;
    //   !this.$v.gFIO.required && errors.push(this.$t('errorRequired'));
    //   !this.$v.gFIO.minLength && errors.push(this.$t('errorMinLength4'));
    //   return errors;
    // },
    // gEmailErrors() {
    //   const errors = [];
    //   if (!this.$v.gEmail.$dirty) return errors;
    //   !this.$v.gEmail.required && errors.push(this.$t('errorRequired'));
    //   return errors;
    // },
    // gPasswordErrors() {
    //   const errors = [];
    //   if (!this.$v.gPassword.$dirty) return errors;
    //   !this.$v.gPassword.required && errors.push(this.$t('errorRequired'));
    //   return errors;
    // },
    EmailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push(this.$t('errorRequired'));
      return errors;
    },
    PasswordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push(this.$t('errorRequired'));
      return errors;
    },
    checkMode() {
      return process.env.VUE_APP_WORK_MODE === 'internet' ? 1 : 0;
    },
  },
  validations: {
    // gEmail: { required },
    // gPassword: { required },
    // gFIO: {
    //   required,
    //   minLength: minLength(4),
    // },
    email: { required },
    password: { required },
  },
  watch: {
    status: function(value) {
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
  background: #DEEAF8 !important;
}
.headline{
  font-family: 'Ubuntu', sans-serif !important;
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  color: #0A083A;
  text-align: center;
}
.headline__timer{
  display: block;
  font-family: 'Ubuntu';
  font-weight: 500 !important;
  font-size: 25px !important;
  line-height: 29px;
  text-transform: uppercase;
  color: #0A083A; 
  margin-top: 10px;
}


</style>
