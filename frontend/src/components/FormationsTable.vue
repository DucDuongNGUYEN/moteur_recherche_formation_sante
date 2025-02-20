<template>
  <v-container class="mt-15 col-11">
    <!--<v-data-table :headers="headers" :items="formations" sort-by="id" class="elevation-1" :search="search" fixed-header height="900px">-->
    <v-data-table :headers="headers" :items="formations" sort-by="id" class="elevation-1" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Table des formations</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Tapez votre recherche" single-line
            hide-details></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Ajouter une formation
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row v-for="header in newHeaders" :key="header.id">
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field v-if="header.value !== 'user_id'" v-model="editedItem[header.value]" :label="header.text"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog('dialog')">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5 custom-title">Êtes-vous sûr(e) de vouloir supprimer la formation d'ID {{ editedItem.id }} ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog('dialogDelete')">Annuler</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getFormations">
          Réinitialiser
        </v-btn>
      </template>
    </v-data-table>
    
    <v-btn fab dark right absolute @click="scrollToTop">
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
  </v-container>
</template>
<script>

import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "Actions", value: "actions", sortable: false },
        { text: "ID", value: "id" },
        { text: "ID de formateur", value: "user_id" },
        { text: "Type de structure", value: "type_structure" },
        { text: "Type de formation", value: "type_formation" },
        { text: "Titre", value: "titre" },
        { text: "Thème", value: "theme" },
        { text: "Professions", value: "professions" },
        { text: "Public cible", value: "public_cible" },
        { text: "Région", value: "region" },
        { text: "Lieux", value: "lieux" },
        { text: "Catégorie de durée", value: "categorie_duree" },
        { text: "Durée", value: "duree" },
        { text: "Structure", value: "structure" },
        { text: "Responsable", value: "responsable" },
        { text: "Diplôme", value: "diplome" },
        { text: "Prix", value: "prix" },
        { text: "Financement possible", value: "financement_possible" },
        { text: "Lien", value: "lien" },
      ],
      editedIndex: -1,
      editedItem: this.createEmptyItem(),
      defaultItem: this.createEmptyItem(),
    };
  },

  computed: {
    ...mapGetters(['formations','getAccessToken', 'getCurrentUserId']),
    formTitle() {
      return this.editedIndex === -1 ? "Nouvelle Formation" : "Modifier la formation";
    },
    newHeaders() {
      return this.headers.slice(2);
    },
  },

  created() {
    this.getFormations();
  },

  methods: {
    ...mapActions(['getFormations', 'createFormation', 'updateFormation', 'deleteFormation']),
    createEmptyItem() {
      return {
        id: "",
        type_structure: "",
        type_formation: "",
        titre: "",
        theme: "",
        professions: "",
        public_cible: "",
        region: "",
        lieux: "",
        categorie_duree: "",
        duree: "",
        structure: "",
        responsable: "",
        diplome: "",
        prix: "",
        financement_possible: "",
        lien: "",
      };
    },

    editItem(item) {
      this.editedIndex = this.formations.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.formations.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
    },

async deleteItemConfirm() {
    try {
      await this.deleteFormation({
        action: "getFormations",
        editedItemId: this.editedItem.id,
        closeDialog: this.closeDialog, accessToken: this.getAccessToken
      });
    } catch (error) {
      console.error(error);
    }
  },

    closeDialog(dialogName) {
      this[dialogName] = false;
      this.$nextTick(() => {
        this.resetEditedItem();
      });
    },

    resetEditedItem() {
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    },

    async save() {
      
      if (this.editedIndex > -1) {
        await this.updateFormation({ action: "getFormations", editedItemId: this.editedItem.id, editedItem: this.editedItem , accessToken: this.getAccessToken });
      } else {
        this.editedItem.user_id = this.getCurrentUserId;
         await this.createFormation({ action: "getFormations", editedItem: this.editedItem , accessToken: this.getAccessToken});
      }
      this.closeDialog('dialog');
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
  
  },
};

</script>
<style lang="scss" scoped>
.custom-title {
  word-break: normal;
}
</style>