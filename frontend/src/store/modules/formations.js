import api from "./api";

const formationsModule = {
  state: {
    formations: [],
    formation: null,
  },
  mutations: {
    setFormations(state, payload) {
      state.formations = payload;
    },
    //payload est le valeur de commit
    setFormationById(state, payload) {
      state.formation = payload;
    },
  },
  getters: {
    formations: (state) => state.formations,

    formation: (state) => state.formation,

    getFormationsByUserId: (state) => (userId) => {
      return state.formations.filter(
        (formation) => formation.user_id === userId
      );
    },
  },
  actions: {
    async getFormations({ commit }) {
      try {
        const response = await api.get("/formations");
        commit("setFormations", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async getFormationById({ commit }, { id }) {
      try {
        const response = await api.get("/formations/" + id);
        commit("setFormationById", response.data);
      } catch (error) {
        console.log(error);
      }
    },

    async createFormation({ dispatch }, { action, editedItem, accessToken }) {
      try {
        await api.post("/formations", editedItem, {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });
        // Call the "getFormations" action to update the list of formations
        dispatch(action);
      } catch (error) {
        console.error(error);
      }
    },
    async updateFormation(
      { dispatch },
      { action, editedItemId, editedItem, accessToken }
    ) {
      try {
        await api.put(`/formations/${editedItemId}`, editedItem, {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });
        dispatch(action);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteFormation(
      { dispatch },
      { action, editedItemId, closeDialog, accessToken }
    ) {
      try {
        await api.delete(`/formations/${editedItemId}`, {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });

        await dispatch(action);
        closeDialog("dialogDelete");
        console.log("Delete successful");
      } catch (error) {
        closeDialog("dialogDelete");
        console.error(error);
        console.log("Delete failed !");
      }
    },
    // async getFormationByAuthorId({ commit }, { userId }) {
    //   try {
    //     const response = await api.get(`/formations/user_id/${userId}`);
    //     commit("setFormations", response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
};

export default formationsModule;
