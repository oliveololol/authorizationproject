<template>
  <div class="wrapper " >
    <header class="header">

    </header>

    <div class="login r">
      <div class="login__container">
        <div class="login__content">
          <transition name="bounce" appear>
            <div class="login__form form">
              <div class="form__header">
                <h2>{{ $t('resetpass') }}</h2>
              </div>
              <div class="from__content">
                <div class="form__row">
                  <span class="icon-login"></span>
                  <input
                    v-model="email"
                    :label="$t('lblLogin')"
                    type="text"
                    color="success"
                    input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    class="form__input loginInput mx-6"
                    placeholder="Логін"
                  />
                  <div v-if="$v.email.$error" class="error-message q">
                    {{ $t('errorRequired') }}
                  </div>
                </div>
  
                <div class="form__row">
                  <span class="icon-pass"></span>
                  <input
                    v-model="password"
                    :label="$t('lblPassword')"
                    :type="showPassword ? 'text' : 'password'"
                    color="success"
                    input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    class="form__input loginInput mx-6"
                    placeholder="Пароль"
                  />
                  <span
                    class="btn-icon btn-icon-pass"
                    @click.stop="toggleShowPassword('pass')"
                  >
                    <v-icon v-show="showPassword" 
                      >mdi-eye</v-icon
                    >
                    <v-icon v-show="!showPassword" 
                      >mdi-eye-off</v-icon
                    >
                  </span>
                </div>
  
                <div class="form__row">
                  <span class="icon-pass"></span>
                  <input
                    v-model="Npassword"
                    class="form__input loginInput mx-6"
                    placeholder="Новий пароль"
                    :label="$t('lblPassword')"
                    :type="showNPassword ? 'text' : 'password'"
                    :counter="255"
                    maxlength="255"
                    input="$v.Npassword.$touch()"
                    color="success"
                    @blur="$v.Npassword.$touch()"
                  />
                  <span
                    class="btn-icon btn-icon-pass"
                    @click.stop="toggleShowPassword('new')"
                  >
                    <v-icon v-show="showNPassword" 
                      >mdi-eye</v-icon
                    >
                    <v-icon v-show="!showNPassword" 
                      >mdi-eye-off</v-icon
                    >
                  </span>
                  <div
                    v-if="this.submitted && $v.Npassword.$error"
                    class="error-message"
                  >
                    <div
                      v-if="Npassword && !$v.Npassword.minLength"
                      class="error-message"
                    >
                      {{ $t('errorLengtpass') }}
                    </div>
                    <div
                      v-if="Npassword && !$v.Npassword.valid"
                      class="error-message"
                    >
                      {{ $t('errorSymbol') }}
                    </div>
                  </div>
                </div>
                <div class="form__row">
                  <span class="icon-pass"></span>
                  <input
                    v-model="Cpassword"
                    :type="showCPassword ? 'text' : 'password'"
                    class="form__input loginInput mx-6"
                    placeholder="Підтвердження паролю"
                    v-on:keyup.enter="login"
                    input="$v.Cpassword.$touch()"
                    color="success"
                    @blur="$v.Cpassword.$touch()"
                  />
                  <span
                    class="btn-icon btn-icon-pass"
                    @click.stop="toggleShowPassword('confirm')"
                  >
                    <v-icon v-show="showCPassword" 
                      >mdi-eye</v-icon
                    >
                    <v-icon v-show="!showCPassword" 
                      >mdi-eye-off</v-icon
                    >
                  </span>
                  <div
                    v-if="this.submitted && $v.Cpassword.$error"
                    class="error-message"
                  >
                    <span
                      v-if="Cpassword && !$v.Cpassword.sameAsPassword"
                      class="error-message"
                    >
                      {{ $t('errorComfirm') }}
                    </span>
                  </div>
                </div>
  
                <div class="form__actions">
                  <a href="/login" class="btn btn-second mx-6">{{ $t('cancel') }}</a>
                  <button
                    block
                    class="btn btn-main loginBatton"
                    large
                    @click="login"
                    :disabled="this.isDisabled"
                    :class="{ _disable: isDisabled }"
                  >
                    {{ $t('edit') }}
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
                <div class="form__prompt">
                  <v-tooltip top color="error" v-if="!error">
                    <template v-slot:activator="{ on, attrs }">
                      <div v-bind="attrs" v-on="on">
                        <p class="form__promt-text">
                          {{ $t('conditionsPass') }}
                        </p>
                        <span class="form__prompt-icon "></span>
                      </div>
                    </template>
                    <span >{{ $t('term1') }}</span>
                  </v-tooltip>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService.js';
// import UserService from '@/services/UserService';
import { minLength, sameAs, required } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      // Обычный вход
      email: null,
      password: null,
      Npassword: null,
      Cpassword: null,
      showPassword: false,
      showNPassword: false,
      showCPassword: false,
      error: null,
      user: null,
      editedIndex: -1,
      promptMessage: false,
      editedItem: {
        ID: 0,
        Password: '',
      },
      ...mapState(['user']),
    };
  },
  methods: {
    ...mapActions(['setIsLoad', 'setActivePage']),
    ...mapActions('notice', ['setNoticeSuccess', 'setNoticeError']),

    async login() {
      try {
        this.$v.email.$touch();
        this.$v.password.$touch();
        if (!this.$v.email.$invalid && !this.$v.password.$invalid) {
          const response = await AuthenticationService.login({
           Login: this.email,
            Parol: this.password,
          });
          this.$store.dispatch('setUser', response.data.user);
          
          if (this.Npassword) {
            
            this.editedItem.Parol = this.Npassword;
            
            this.editedItem.ID = response.data.Id;
            console.log(22);
            
          }
          if (this.$route.query.redirect === undefined) {
            this.$router.replace({
              name: 'login',
            });
          }
          
          console.log(32);
          this.setNoticeSuccess(this.$t('updatePassUserMessage'));
          console.log(this.editedItem)
          await AuthenticationService.resetpass(this.editedItem);
        }
      } catch (error) {
        this.error = error.error;
        this.promptMessage = true;
      }
    },
    clear() {
      this.email = '';
      this.password = '';
      this.error = null;
    },
    toggleShowPassword(fieled) {
      if (fieled === 'pass') {
        this.showPassword = !this.showPassword;
      } else if (fieled === 'new') {
        this.showNPassword = !this.showNPassword;
      } else if (fieled === 'confirm') {
        this.showCPassword = !this.showCPassword;
      }
    },
  },
  created() {
    //Кусок в котором все валидации делаются dirty
    this.submitted = true;
    return this.$v.Npassword.$touch() || this.$v.Cpassword.$touch();
  },
  computed: {
    //Використовуется для кнопки
    isDisabled() {
      return this.$v.$invalid;
    },
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
  },
  validations: {
    email: { required },
    password: { required },
    Npassword: {
      required,
      minLength: minLength(8),

      valid: function(value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return containsUppercase && containsLowercase && containsNumber;
      },
    },
    Cpassword: {
      required,
      sameAsNpassword: sameAs('Npassword'),
    },
  },
};
</script>

<style></style>
