import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: 'ua',
  messages: {
    ua: {
      logIn: 'Авторизація',
      singIn: 'Вхід',
      resetpass: 'Зміна паролю',
      edit: 'Змінити',
      cancel: 'Скасувати',
      conditionsPass: 'Умови створення нового паролю',
      guest: 'Гість',
      term1:'Пароль має бути з 8 символів, включаючи велику і маленьку літери та цифру',
      errorSymbol: 'Пароль має включати одну велику літеру та цифру',
      errorLengtpass: 'Використовуйте комбінацію з 8 символів.',
      term2: 'Не правильний логін або пароль',
      errorComfirm: 'Паролі не співпадають',
      btnSingIn: 'Увійти',
      serverNotResponse: 'Сервер не відповідає...',
      lblLogin: 'Логін',
      lblPassword: 'Пароль',
      errorRequired: 'Введіть дані',
      formHint: 'помилка',
      exit:'вихід',
      changedata:'змінити дані',
      registration:'Pегістрація',
      atorization:'Авторизація',
      term3:'Такий користувач вже існує',
      back:'повернутись назад'
    },
  },
});
