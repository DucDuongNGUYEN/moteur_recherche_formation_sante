// searchModule.js
import axios from "axios";

const searchModule = {
  state: {
    query: "",
    results: [],
  },
  mutations: {
    setQuery(state, query) {
      state.query = query;
    },
    setResults(state, results) {
      state.results = results;
    },
  },
  actions: {
    async search({ state, commit }) {
      try {
        const response = await axios.get(
          `http://localhost:5000/formation_data/_search?q=${state.query}`
        );
        const data = response.data;

        if (data && data.hits && data.hits.hits) {
          const results = data.hits.hits.map((hit) => {
            const source = hit._source;
            const highlight = hit.highlight;

            const highlightedSource = {};
            Object.keys(source).forEach((key) => {
              if (highlight[key]) {
                highlightedSource[key] = highlight[key][0];
              } else {
                highlightedSource[key] = source[key];
              }
            });

            return highlightedSource;
          });

          commit("setResults", results);
        } else {
          console.log("Invalid response format:", data);
          commit("setResults", []);
        }
      } catch (error) {
        console.error("Error:", error);
        commit("setResults", []);
      }
    },
  },
  getters: {
    highlightedText: (state) => (text) => {
      return text ? `<span class="highlight">${text}</span>` : "";
    },
  },
};

export default searchModule;
