<template>
  <!--class = "col-10"-->
 
  <v-app>
    <v-main>
      <v-container class="grey lighten-4 justify-center mb-12 mt-12">
    <v-card class="d-flex justify-center mb-8">
      <v-row class="mb-1 mt-6 mx-4" no-gutters>
        <v-col cols="12" sm="3" xs="8" lg="3" v-for="(option, index) in options" :key="index">
          <v-autocomplete small small-chips multiple outlined tile class="pa-2" clearable color="blue"
            :items="option" :label="labels[index]" v-model="selectedOptions[getSelectedOptionKey(index)]"
            @change="updateSelectedOption(index)">
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-card>

    <div class="mb-2 ml-10 font-weight-bold">{{ getFilteredResultsCount() }} résultats trouvés / {{ numPages() }} pages
    </div>

    <div class="mt-8">
      <v-row v-for="(formation, index) in paginatedFormations()" :key="index" cols="12" md="6" lg="4">
        <v-col>
          <v-card class="mb-2">
            <v-card-title class="custom-title mt-6 ml-6">{{ formation.titre }}</v-card-title>
            <v-card-subtitle class="mt-3 ml-6">{{ formation.structure }}</v-card-subtitle>
            <v-card-subtitle class="ml-6">{{ formation.region }}</v-card-subtitle>
            <v-card-actions>
              <v-btn class="ml-6 mb-6" color="primary"
                @click="$router.push({ name: 'formation-details', params: { id: formation.id } })">En
                savoir plus</v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-pagination v-model="page" :length="numPages()" :total-visible="7" @input="updatePage"></v-pagination>
      </div>

    </div>

    <div>
      <v-btn fab dark right absolute @click="scrollToTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
  
    </div>

  </v-container>
    </v-main>
  </v-app>

</template>

<script>
// import {mapActions, mapGetters} from "vuex";
export default {
  data() {
    return {
      options: [],
      labels: [
        "Type de formation ?",
        "Thème ?",
        "Professions ?",
        "Région ?",
        "Catégorie de durée ?",
        "Type de structure ?",
        "Diplôme ?",
        "Financement possible ?",
      ],
      selectedOptions: {
        type_formation: [],
        theme: [],
        professions: [],
        region: [],
        categorie_duree: [],
        type_structure: [],
        diplome: [],
        financement_possible: [],
      },
      // formations: [],
      filteredFormations: [],
      page: 1,
      pageSize: 10,
    };
  },
  // computed:{
  //   ...mapGetters(['formations']),
  // },
  methods: {
    // ...mapActions(['getFormations']),
    async fetchFormations() {
      try {
        // this.getFormations();
        await this.$store.dispatch("getFormations");
        this.formations = this.$store.getters.formations;
        // Convertir les valeurs de chaque colonne dans la table de formations en les options
        this.getOptions();
        // Filtrez les formations lors de la récupération initiale
        this.filterFormations();
      } catch (error) {
        console.error(error);
      }
    },
    getOptions() {
      const keys = Object.keys(this.selectedOptions);

      for (const key of keys) {
        const values = [
          ...new Set(
            this.formations.flatMap((formation) =>
              formation[key].split(",").map((value) => value.trim())
            )
          ),
        ].sort();
        this.options.push(values);
      }
      console.log(this.options);
    },

    //La méthode getSelectedOptionKey est une fonction qui renvoie une clé de chaîne en fonction de l'index donné. Cette clé est utilisée pour indexer les options sélectionnées dans un objet selectedOptions.
    getSelectedOptionKey(index) {
      switch (index) {
        case 0:
          return "type_formation";
        case 1:
          return "theme";
        case 2:
          return "professions";
        case 3:
          return "region";
        case 4:
          return "categorie_duree";
        case 5:
          return "type_structure";
        case 6:
          return "diplome";
        case 7:
          return "financement_possible";
        default:
          return "";
      }
    },
    //La méthode updateSelectedOption est appelée chaque fois qu'une option est sélectionnée dans l'un des composants de liste déroulante. Il appelle la méthode filterFormations pour filtrer les formations en fonction des options sélectionnées.
    updateSelectedOption() {
      this.filterFormations();
    },
    //La méthode filterFormations filtre les formations en fonction des options sélectionnées stockées dans l'objet selectedOptions. Elle compare chaque option sélectionnée avec la propriété correspondante de chaque formation. Si toutes les options sélectionnées correspondent à une formation, cette dernière est incluse dans le tableau filteredFormations.
    filterFormations() {
      const { type_formation, theme, professions, region, categorie_duree, type_structure, diplome, financement_possible } = this.selectedOptions;
      this.filteredFormations = this.formations.filter((formation) => {
        return (
          (type_formation.length === 0 || type_formation.some((type) => formation.type_formation.includes(type))) &&
          (theme.length === 0 || theme.some((t) => formation.theme.includes(t))) &&
          (professions.length === 0 || professions.some((p) => formation.professions.includes(p))) &&
          (region.length === 0 || region.some((r) => formation.region.includes(r))) &&
          (categorie_duree.length === 0 || categorie_duree.some((d) => formation.categorie_duree.includes(d))) &&
          (type_structure.length === 0 || type_structure.some((s) => formation.type_structure.includes(s))) &&
          (diplome.length === 0 || diplome.some((d) => formation.diplome.includes(d))) &&
          (financement_possible.length === 0 || financement_possible.some((f) => formation.financement_possible.includes(f)))
        );
      });
      this.paginatedFormations = this.paginate(filteredFormations);
    },

    // rendre un nombre de résultats trouvées
    getFilteredResultsCount() {
      return this.filteredFormations.length;
    },
    numPages() {
      return Math.ceil(this.getFilteredResultsCount() / this.pageSize);
    },
    paginatedFormations() {
      const startIndex = (this.page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredFormations.slice(startIndex, endIndex);
    },
    updatePage(page) {
      this.page = page;
      this.paginatedFormations = this.paginate(this.formations);
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
  },

  created() {
    this.fetchFormations();

  },
};
</script>
<style lang="scss" scoped>
.custom-title {
  word-break: normal;
}
</style>