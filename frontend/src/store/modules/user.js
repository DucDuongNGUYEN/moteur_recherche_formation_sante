import api from "./api";

const userModule = {
  state: {
    users: {
      allUsers: [],
      isFetching: false,
      error: false,
    },
  },
  mutations: {
    // setAllUsers(state, payload) {
    //   state.users.allUsers = payload;
    // },
    getUsersStart(state) {
      state.users.isFetching = true;
      state.users.error = false;
    },
    getUsersSuccess(state, payload) {
      state.users.isFetching = false;
      state.users.allUsers = payload;
    },
    getUsersFailed(state) {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart(state) {
      state.users.isFetching = true;
      state.users.error = false;
    },
    deleteUsersSuccess(state) {
      state.users.isFetching = false;
    },
    deleteUserFailed(state) {
      state.users.isFetching = false;
      state.users.error = true;
    },
    updateUserStart(state) {
      state.users.isFetching = true;
      state.users.error = false;
    },
    updateUserSuccess(state) {
      state.users.isFetching = false;
    },
    updateUserFailed(state) {
      state.users.isFetching = false;
      state.users.error = true;
    },
    updateRoleStart(state) {
      state.users.isFetching = true;
      state.users.error = false;
    },
    updateRoleSuccess(state) {
      state.users.isFetching = false;
    },
    updateRoleFailed(state) {
      state.users.isFetching = false;
      state.users.error = true;
    },
  },
  getters: {
    users: (state) => state.users.allUsers,
  },
  actions: {
    async getAllUsers({ commit }) {
      commit("getUsersStart");
      try {
        const res = await api.get("/users");
        commit("getUsersSuccess", res.data);
      } catch (err) {
        commit("getUsersFailed");
      }
    },
    async updateUser({ commit }, { id, userData }) {
      commit("updateUserStart");
      try {
        const res = await api.put(`/users/${id}`, userData);
        commit("updateUserSuccess", res.data);
      } catch (err) {
        commit("updateUserFailed", err.response.data);
      }
    },
    // async updateRole({ dispatch }, { userId, editedRole, accessToken }) {
    //   commit("updateRoleStart");
    //   try {
    //     const res = await api.patch(`/users/role/${userId}`, editedRole, {
    //       headers: {
    //         token: `Bearer ${accessToken}`,
    //       },
    //     });
    //     commit("updateRoleSuccess", res.data);
    //     dispatch("getAllUsers");
    //   } catch (err) {
    //     commit("updateRoleFailed", err.response.data);
    //   }
    // },
    async updateRole({ commit, dispatch }, { userId, editedRole }) {
      commit("updateRoleStart");
      try {
        const res = await api.patch(`/users/role/${userId}`, editedRole);
        commit("updateRoleSuccess", res.data);
        dispatch("getAllUsers");
      } catch (err) {
        commit("updateRoleFailed", err.response.data);
      }
    },

    async deleteUser({ commit, dispatch }, { userId, closeDialog }) {
      try {
        console.log("Delete user action called");
        await api.delete(`/users/${userId}`);
        commit("deleteUsersSuccess");
        await dispatch("getAllUsers");
        closeDialog("dialogDelete");
        console.log("Delete successful");
      } catch (error) {
        commit("deleteUserFailed", err.response.data);
        closeDialog("dialogDelete");
        console.error(error);
        console.log("Delete failed !");
      }
    },

    // async deleteUser({ dispatch }, { userId, closeDialog, accessToken }) {
    //   try {
    //     await api.delete(`/users/${userId}`, {
    //       headers: {
    //         token: `Bearer ${accessToken}`,
    //       },
    //     });
    //     await dispatch("getAllUsers");
    //     commit("deleteUsersSuccess", res.data);
    //     closeDialog("dialogDelete");
    //     console.log("Delete successful");
    //   } catch (error) {
    //     commit("deleteUserFailed", err.response.data);
    //     closeDialog("dialogDelete");
    //     console.error(error);
    //     console.log("Delete failed !");
    //   }
    // },
  },
};

export default userModule;
