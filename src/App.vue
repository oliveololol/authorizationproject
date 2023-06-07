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
  background-image:url(C:\Users\38098\Downloads\Untitled134_20230607150250.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  font-family: 'Material Icons';
  font-family:  Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  

  
}
</style>
