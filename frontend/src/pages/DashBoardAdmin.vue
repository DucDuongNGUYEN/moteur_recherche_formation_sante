<template>
  <v-app>
    <v-navigation-drawer
    id="core-navigation-drawer"
      v-model="drawer"
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      mobile-break-point="960"
      app
      width="260"
      v-bind="$attrs">
      <v-divider class="mb-3" />
      <v-list dense nav>
        <v-list-item-avatar class="align-self-center" color="white" contain>
            <v-img max-height="30" />
          </v-list-item-avatar>
          <v-divider class="mb-3" />
        <v-list-item to="/users">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Utilisateurs</v-list-item-title>
        </v-list-item>
        <v-list-item to="/formationsCRUD">
          <v-list-item-icon>
            <v-icon>mdi-book</v-icon>
          </v-list-item-icon>
          <v-list-item-title >Formations</v-list-item-title>
        </v-list-item>
        <v-list-item to="/logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title >Sortie</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
    absolute
    color="transparent"
    flat
    height="75"
     app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Tableau de bord d'administration</v-toolbar-title>
    </v-app-bar>

    <v-main class="grey lighten-4 ">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
    data() {
      return {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        drawer: true,
        
      };
    },

};
</script>
<style lang="scss" scoped>
#core-navigation-drawer {
  .v-list-item__icon:first-child {
    justify-content: center;
    text-align: center;
    width: 20px;
    margin-right: 24px;
    margin-left: 12px !important;
  }
  .v-list--dense {
     & .v-list-item__icon:first-child {
      margin-top: 10px;
    }
  }

}

</style>
