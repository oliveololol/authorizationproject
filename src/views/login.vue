<template>
  <!-- Налаштувати сесії -->
  <div class="wrapper">
    <header class="header">
 
   
    </header>
    <v-layout  align-center justify-center v-if="status"  >
      <div class="login ">
        <div class="login__container ">
          <div class="login__content  ">
            <transition name="bounce" appear>
              
              <div class="login__form.form elevation-12">
                <div class="form__header  ">
                  <h2 class="autorization ">{{ $t('logIn') }}</h2>
                </div>
                
                <div class="from__content">
                  <div class="form__row ">
                    <v-icon  color="pink" size="x-large" >mdi-human-scooter</v-icon>
                    <input 
                      v-model="email"
                      :label="$t('lblLogin')"
                      type="text"
                      color="success"
                      :error-messages="EmailErrors"
                      input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                      class=" justify-center form__input  loginInput   " 
                      placeholder="Логін"
                    />
                    <div v-if="$v.email.$error" class="error-message ">{{ $t('errorRequired') }}</div>
                 
                  </div>
    
                  <div class="form__row ml-6 ">
                    <v-icon class="mx-3"  color="info" size="x-large">mdi-form-textbox-password</v-icon>
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
                      class="  form__input loginInput    "
                      placeholder="Пароль"
                    />
                    <span class="btn-icon btn-icon-pass ml-4" @click.stop="toggleShowPassword()">
                      <v-icon v-show="showPassword" color="indigo darken-4">mdi-eye</v-icon>
                      <v-icon v-show="!showPassword" color="indigo darken-4" >mdi-eye-off</v-icon>
                      
                    </span>
                    <div v-if="$v.password.$error" class="error-message">{{ $t('errorRequired') }}</div>
                  </div>
    
                  <div class="form__actions ">
                    <a href="/resetpass" class="btn btn-second">{{
                      $t('resetpass')
                    }}</a>
                    <button
                      
                      block
                      class="btn btn-main loginBatton "
                      large
                      @click="login"
                    >
                      {{ $t('singIn') }}
                    </button>
                    
                  </div>
                  
                  <div class="form__prompt ">
                      <v-tooltip top color="error" v-if="this.promptMessage == true">
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
            Login: this.email,
            Parol: this.password,
          });
          console.log(response.data)
          this.$store.dispatch('setToken', response.data.Token);
          this.$store.dispatch('setUser', response.data.Id);
          clearInterval(this.timerId);
          if (this.$route.query.redirect === undefined) {
            
            this.$router.replace({
              name: 'logtable',
            });
          } else
          {
           this.$router.replace(this.$route.query.redirect);}
        }
      } catch (error) {
        // alert("не правильний логін або пароль ");
        this.error = error.error;
        this.promptMessage = true;
      }
    },
   
    clear() {
      this.email = '';
      this.password = '';
      this.error = null;

    },
    async check() {
      try {
        const result = (await StatusService.checkStatus());
        if (result) this.status = true;
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
