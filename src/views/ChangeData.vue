<template>
  <div class="data">
    <input
      v-model="Name"
      type="text"
      color="succes"
      input="$v.Name.$touch()"
      class="justify-center form__input loginInput"
      placeholder="Ім'я"
    />
    <div v-if="$v.Name.$error" class="error-message vx z ">
                      {{ $t("errorRequired") }}
                    </div>
    <input
      v-model="SurName"
      type="text"
      color="succes"
      input="$v.SurName.$touch()"
      class="justify-center form__input loginInput"
      placeholder="Прізвище"
    />
    <div v-if="$v.SurName.$error" class="error-message vx z ">
                      {{ $t("errorRequired") }}
                    </div>
    <button @click="UpData" class="chen" >
      {{ $t("changedata") }}
    </button>
    <a href="/logtable" class="exit"> {{$t("back")}} </a>
  </div>
</template>

<script>
import ChangeData from "@/services/ChangeData.js";
import {  mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      Name: "",
      SurName: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    
    async UpData() {
      this.$v.Name.$touch();
        this.$v.SurName.$touch();
        if ( !this.$v.Name.$invalid && !this.$v.SurName.$invalid) {
      console.log(this.Name, this.SurName);
      const response = await ChangeData.ChangeData({
        Id: this.user.Id,
        Name: this.Name,
        Surname: this.SurName,
        
      });
      
      let user = {
        Id: response.data.Id,
        Name: response.data.Name,
        Surname: response.data.Surname,
      };
      this.$store.dispatch("setUser", user);

      if (this.$route.query.redirect === undefined) {
            this.$router.replace({
              name: "logtable",
            });
          } else {
            this.$router.replace(this.$route.query.redirect);
          }
        }
    },
    
  },
  validations: {
    Name: { required },
    SurName: { required }
  }, 
};
</script>

<style></style>
