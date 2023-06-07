<template>
  <v-container >
    <v-row class="form_row " >
      <v-data-table 
         class=" v-table elevation-21 "
        :headers="header"
        :items="item"
      >
      </v-data-table>
      <div class="form__actions mt-16">
                  <a @click="logout();" href="/login" class="btn btn-second qw ">{{ $t('cancel') }}</a>
                  
                </div>
    </v-row>
  </v-container>
</template>
<script>
import logtable from "@/services/log.js";
import { mapActions, mapState } from "vuex";

export default {
  logtable,
  data() {
    return {
      
      header: [
        { text: "id-user", value: "IdUsers" },
        { text: "event", value: "IdEventNavigation.Nameevent" },
        { text: "time", value: "Date" },
      ],
      item: [],
    };
  },
  created() {
    this.init();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(['setLogout']),
    async init() {
      try {
        
        this.item = (await logtable.GetLogsByUser(this.user)).data;
      } catch {
        console.log("error");
      }
    },
    logout(){
this.setLogout();
    }
  },
};
</script>
<style></style>
