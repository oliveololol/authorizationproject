<template>
  <v-container>
    <v-row>
      <v-data-table :headers="header" :items="item">
       
      </v-data-table>
    </v-row>
  </v-container>
</template>
<script>
import logtable from "@/services/log.js";
import { mapState } from "vuex";

export default {
  data() {
    return {
      header: [
        { text: "id-user", value: "IdUsers" },
        { text: "event", value: "IdEvent" },
        { text: "time", value: "Date" },
      ],
      item: [],
    };
  },
  created(){
    this.init();
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
   async init(){
    try{
        console.log(this.user);
        this.item=(await logtable.GetLogsByUser(this.user)).data;
        
    }
    catch{
        console.log("error")
    }
   }
  }
  
};
</script>
<style></style>
