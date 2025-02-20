<template>
  <v-container class="mt-10">
    <v-text-field v-model="query" label="Tapez votre recherche" outlined></v-text-field>
    <div class="mb-2 ml-10 font-weight-bold">{{ results.length }} résultats trouvés</div>
    <v-row v-for="formation in results" :key="formation.id" cols="12" md="6" lg="4">
      <v-col>
        <v-card class="mb-2">
          <v-card-title v-html="highlightText(formation.id)"></v-card-title>
          <v-card-title v-html="highlightText(formation.type_formation)"></v-card-title>
          <v-card-subtitle v-html="highlightText(formation.theme)"></v-card-subtitle>
          <v-card-subtitle v-html="highlightText(formation.public_cible)"></v-card-subtitle>
          <v-card-title v-html="highlightText(formation.region)"></v-card-title>
          <v-card-subtitle v-html="highlightText(formation.categorie_duree)"></v-card-subtitle>
          <v-card-subtitle v-html="highlightText(formation.type_structure)"></v-card-subtitle>
          <v-card-subtitle v-html="highlightText(formation.diplome)"></v-card-subtitle>
          <v-card-subtitle v-html="highlightText(formation.financement_possible)"></v-card-subtitle>
          <v-card-actions>
            <v-btn
              class="ml-6 mb-6"
              color="primary"
              @click="$router.push({ name: 'formation-details', params: { id: formation.id } })"
            >
              En savoir plus
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      results: [],
    };
  },
  methods: {
    search() {
      fetch(`http://localhost:5000/formation_data/_search?q=${this.query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.hits && data.hits.hits) {
            this.results = data.hits.hits.map((hit) => {
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
          } else {
            console.log('Invalid response format:', data);
            this.results = data;
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          this.results = [];
        });
    },
    highlightText(text) {
      return text ? `<span class="highlight">${text}</span>` : '';
    },
  },
  watch: {
    query() {
      this.search();
    },
  },
};
</script>

<style scoped>
.highlight {
  background-color: yellow;
}
</style>
