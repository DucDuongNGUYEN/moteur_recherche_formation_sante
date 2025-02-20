import api from "./api";

const commentsModule = {
  state: {
    comments: [],
  },

  mutations: {
    setComments(state, comments) {
      state.comments = comments;
    },
  },

  getters: {
    comments: (state) =>
      state.comments.map((comment) => {
        comment.date = comment.date.split("T")[0];
        return comment;
      }),
  },
  actions: {
    async getFormationComments({ commit }, { id }) {
      try {
        const response = await api.get(`/formations/${id}/comments`);
        const comments = response.data;
        commit("setComments", comments);
      } catch (error) {
        console.error(error);
      }
    },
    async postComment({ dispatch }, { id, data }) {
      try {
        await api.post(`/formations/${id}/comments/`, data);
        dispatch("getFormationComments", { id });
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default commentsModule;
