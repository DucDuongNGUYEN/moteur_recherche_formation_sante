<template>
  <!-- v-show="!($route.path === '/login' || $route.path === '/register' || $route.path.includes('/formations/'))"-->
  <v-footer
    color="primary lighten-1"
    padless
    v-show="$route.path === '/'"
  >
  <!--v-show="!($route.path === '/login' || $route.path === '/register' || $route.path === '/users' || $route.path === '/formationsCRUD' || $route.path === '/formateur'  || $route.path === '/search' || $route.path.includes('/formations/'))"-->
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Copyright © Répertoire des formations en Santé-Environnement</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script lang="ts">
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>