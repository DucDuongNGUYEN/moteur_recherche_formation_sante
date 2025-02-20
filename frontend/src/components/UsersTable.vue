<template>
  <v-container class="mt-15 col-11">
    <v-data-table :headers="headers" :items="formattedUsers" sort-by="user_id" class="elevation-1" :search="search">

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Table des utilisateurs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Tapez votre recherche" single-line
            hide-details></v-text-field>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Modifier le rôle de l'utilisateur d'ID: {{ editedRole.user_id }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-col cols="12" sm="12" md="12">
                    <v-select v-model="editedRole.role" :items="roleOptions" label="Rôle"></v-select>
                  </v-col>
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
              <v-card-title class="text-h5 custom-title">Êtes-vous sûr(e) de vouloir supprimer l'utilisateur d'ID {{ editedRole.user_id
              }} ?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog('dialogDelete')">Annuler</v-btn>
                <v-btn color="blue darken-1" text @click="deleteUserConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <v-snackbar v-model="hasSaved" :timeout="3000" absolute bottom left>
          Votre base de données a été mise à jour
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="hasSaved = false">
              Fermer
            </v-btn>
          </template>
        </v-snackbar>

      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editRole(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="setDeleteUser(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getAllUsers">
          Réinitialiser
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';

export default {
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      hasSaved: false,
      headers: [
        { text: "ID", value: "user_id" },
        { text: "Nom et Prénom", value: "user_name" },
        { text: "Email", value: "user_email" },
        { text: "Rôle", value: "role" },
        { text: "Créé à", value: "created_at" },
        { text: "Mis à jour à", value: "updated_at" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedRole: { role: "" },
      defaultRole: { role: "" },
      roleOptions: ['USER', 'ADMIN', 'FORMATEUR'],
    };
  },

  computed: {
    ...mapGetters(['users', 'getAccessToken']),
//cloner la table users et convertir le format de colonne created_at et updated_at
    formattedUsers() {
      return this.users.map(user => ({
        ...user,
        created_at: this.formatDate(user.created_at),
        updated_at: this.formatDate(user.updated_at),
      }));
    },
  },

  created() {
    this.getAllUsers();
  },

  methods: {
    ...mapActions(['getAllUsers', 'updateRole', 'deleteUser']),

    // convertir le timestamp dans la base de donnéés en le format DD/MM/YYYY, HH:mm:ss
    formatDate(timestamp) {
      return moment(timestamp).format('DD/MM/YYYY, HH:mm:ss');
    },

    editRole(user) {
      this.editedRole = { ...user };
      this.dialog = true;
    },

    setDeleteUser(user) {
      this.editedRole = { ...user };
      this.dialogDelete = true;
    },

    async deleteUserConfirm() {
      try {
        await this.deleteUser({
          userId: this.editedRole.user_id,
          closeDialog: this.closeDialog

        });
      } catch (error) {
        console.error(error);
      }
    },

    closeDialog(dialogName) {
      this[dialogName] = false;
      this.$nextTick(() => {
        this.resetEditedRole();
      });
    },

    resetEditedRole() {
      this.editedRole = { ...this.defaultRole };
    },

    async save() {
      await this.updateRole({ userId: this.editedRole.user_id, editedRole: this.editedRole });
      this.hasSaved = true;
      this.closeDialog('dialog');

    },
  },
};
</script>
<style lang="scss" scoped>
.custom-title {
  word-break: normal;
}
</style>
