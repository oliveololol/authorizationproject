<template>
  <v-container>
    <v-row class="form_row mt-2">
      <div class="bloc">{{ user.Name }} {{ user.Surname }}</div>
      <v-data-table
        class="v-table elevation-21"
        :headers="header"
        :items="item"
      >
      </v-data-table>
      <div>
        <button class="change" @click="ChangeData()">
          {{ $t("changedata") }}
        </button>
        <div class="form__actions mt-16">
          <a @click="logout()" href="/login" class="btn btn-second qw">{{
            $t("exit")
          }}</a>
        </div>
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
    ChangeData() {
      console.log(this.$route.query.redirect);
      if (this.$route.query.redirect === undefined) {
              this.$router.replace({
                name: "ChangeData",
              });
              
            } else {
              this.$router.replace(this.$route.query.redirect);
            }
    },

    ...mapActions(["setLogout"]),
    async init() {
      try {
        this.item = (await logtable.GetLogsByUser(this.user.Id)).data;
      } catch {
        console.log("error");
      }
    },
    logout() {
      this.setLogout();
    },
  },
};
</script>
<style></style>
