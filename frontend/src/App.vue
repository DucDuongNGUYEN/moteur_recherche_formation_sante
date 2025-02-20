<template>
  <v-app>
     <!--   <template >
      <router-view/>
    </template>-->
   <template >
      <Navbar/>
      <router-view/>
      <Footer/>
    </template>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
export default {
  components: { Navbar, Footer },
  name: 'App',

  // data: () => ({
  //   //
  // }),
};
</script>

