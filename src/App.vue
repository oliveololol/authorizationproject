<template>
  <v-app id="app">
    <v-main >
      
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  
  name: "App",
};
</script>

<style>
@import "./assets/style.css";
#app {
  background-image:url(https://gdb.rferl.org/7B5630DD-1E13-4400-B850-DA636ED209F5_cx0_cy3_cw93_w1200_r1.jpg);
  font-family: 'Material Icons';
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  

  
}
</style>
