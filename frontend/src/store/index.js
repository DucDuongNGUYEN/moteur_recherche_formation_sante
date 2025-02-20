import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import formationsModule from "./modules/formations.js";
import authModule from "./modules/auth.js";
import userModule from "./modules/user.js";
import searchModule from "./modules/search.js";
import commentsModule from "./modules/comments.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    formationsModule,
    authModule,
    userModule,
    searchModule,
    commentsModule,
  },
  // enregistrer des données dans stockage local
  plugins: [
    createPersistedState({
      key: ["formationsModule", "authModule", "userModule"],
    }),
  ],
});
