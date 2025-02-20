<template>
  <v-app-bar color="indigo" app >
   
    <v-spacer></v-spacer>

    <v-btn class="white--text" text href="/">Accueil</v-btn>

    <v-spacer></v-spacer>
    <v-btn class="white--text" v-show="!($route.path == '/login' || $route.path == '/register')" text href="/search">Recherche</v-btn>

    <v-spacer></v-spacer>
    <!--<template v-if="loginSuccess">-->
    <template v-if="getCurrentUser">
      <v-card-title> <span class="white--text"> Salut, {{currentUserName}}</span></v-card-title>
      <v-spacer></v-spacer>
      <v-btn to="/logout" @click="handleLogout">Déconnexion</v-btn>
    </template>
    <!--<template v-else>-->
    <template v-else>
      <v-btn to="/login">Se connecter</v-btn>
    </template>
  </v-app-bar>
</template>
  
<script lang="ts">
import {mapActions, mapMutations , mapGetters} from 'vuex'
export default {
  computed: {
 
    ...mapGetters(['currentUserName', 'getCurrentUser']),
  },
  methods: {

    ...mapActions(['logOut']),
    ...mapMutations(['logOutSuccess']), // Import the logOut action from the authModule
    async handleLogout() {
      await this.logOut();
    },


  },
}
</script>
