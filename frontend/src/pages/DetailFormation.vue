<template>
    <v-app>
        <v-main>
            <v-container fluid>
                <div>
                    <v-cart-title>
                        <h1 class="d-flex justify-center mt-8 pa-10 blue white--text">
                            <a :href="formation.lien" target="_blank" class="custom-title">{{ formation.titre }}</a>
                        </h1>
                    </v-cart-title>
                    <v-container class="grey lighten-4 justify-center mb-12 mt-12 rounded-lg">

                        <div v-if="formation">

                            <p class="justify-center display-1 mb-12">VOTRE FORMATION EN BREF</p>

                            <p><v-icon>fa-users-gear</v-icon>
                                <span class="icon-text font-weight-bold">STRUCTURE : </span>
                                {{ formation.structure }}
                            </p>

                            <p><v-icon left>fas fa-user</v-icon>
                                <span class="icon-text font-weight-bold">RESPONSABLE : </span>
                                {{ formation.responsable }}
                            </p>

                            <p> <v-icon class="mr-4" left>fa-location-dot</v-icon>
                                <span class="icon-text font-weight-bold">LIEU : </span>
                                {{ formation.lieux }}
                            </p>

                            <p><v-icon class="mr-2">fa-clock</v-icon>
                                <span class="icon-text font-weight-bold">DURÉE : </span>
                                {{ formation.duree }}
                            </p>

                            <p> <v-icon class="mr-4" left>fa-euro-sign</v-icon>
                                <span class="icon-text font-weight-bold">PRIX : </span>
                                {{ formation.prix }}
                            </p>

                            <p> <v-icon>fa-chalkboard-user</v-icon>
                                <span class="icon-text font-weight-bold">TYPE DE FORMATION : </span>
                                {{ formation.type_formation }}
                            </p>

                            <p> <v-icon class="mr-2">fa-message</v-icon>
                                <span class="icon-text font-weight-bold">THÈME : </span>
                                {{ formation.theme }}
                            </p>

                            <p> <v-icon class="mr-1">fa-users-viewfinder</v-icon>
                                <span class="icon-text font-weight-bold">PUBLIC CIBLE : </span>
                                {{ formation.public_cible }}
                            </p>

                            <p> <v-icon class="mr-3" left>fa-user-graduate</v-icon>
                                <span class="icon-text font-weight-bold">DIPLÔME : </span>
                                {{ formation.diplome }}
                            </p>
                            <p><v-icon class="mr-1">fa-hospital</v-icon>
                                <span class="icon-text font-weight-bold">TYPE DE STRUCTURE : </span>
                                {{ formation.type_structure }}
                            </p>

                            <p> <v-icon class="mr-3" left>fa-building-columns</v-icon>
                                <span class="icon-text font-weight-bold">FINANCEMENT POSSIBLE : </span>
                                {{ formation.financement_possible }}
                            </p>

                            <p> <v-icon class="mr-2">fa-link</v-icon>
                                <span class="icon-text font-weight-bold">LIEN : </span>
                                <a :href="formation.lien" target="_blank">{{ formation.lien }}</a>
                            </p>
                        </div>
                        <div v-else>
                            <p>Chargement en cours...</p>
                        </div>
                    </v-container>

                    <v-container class="grey lighten-4 justify-right mb-12 mt-12 rounded-lg">
                        <div v-if="comments">
                            <p class="justify-center display-1 mb-5 mt-3">COMMENTAIRES</p>
                            <v-list v-for="(com, index) in comments" :key="index">
                                <template>
                                    <v-list-item>
                                        <div>
                                            <span class="comment-header">{{ com.name }} <span class="comment-date">( {{
                                                formatDate(com.date) }} )</span></span>
                                            <br />
                                            <span class="comment-content">{{ com.content }}</span>
                                        </div>
                                    </v-list-item>
                                    <v-divider v-if="index !== comments.length - 1"></v-divider>
                                </template>
                            </v-list>

                            <v-btn id="ajout_com" @click="dialog = true" class="my-5" color="primary">Ajouter un commentaire
                                <v-dialog v-model="dialog" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5 pl-10 ">Ajouter un commentaire</v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-form ref="form">
                                                <v-textarea label="Nom" variant="outlined" rows="1" row-height="15"
                                                    v-model="name" :counter="20" :rules="nameRules" required no-resize
                                                    cols="50"></v-textarea>

                                                <v-textarea v-model="comment" variant="outlined" rows="1" row-height="15"
                                                    :counter="1000" :rules="commentRules" label="Commentaire" required
                                                    auto-grow cols="50"></v-textarea>

                                                <v-textarea v-model="code" variant="outlined" rows="1" row-height="15"
                                                    :rules="codeRules" label="Code" required no-resize
                                                    cols="50"></v-textarea>

                                                <v-alert color="success" icon="$success" variant="tonal" v-if="info"
                                                    closable>Commentaire ajouté</v-alert>
                                                <v-alert color="error" icon="$error" variant="tonal"
                                                    v-if="info !== null && !info" closable>Mauvais code</v-alert>

                                                <v-btn color="blue darken-1" text
                                                    @click="dialog = false; info = null;">Annuler</v-btn>
                                                <v-btn color="blue darken-1" text
                                                    @click="confirm(formation.code_commentaire)">OK</v-btn>
                                            </v-form>


                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-btn>

                        </div>
                        <div v-else>
                            <p>Chargement en cours...</p>
                        </div>
                    </v-container>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
import moment from 'moment';

export default {
    computed: {
        // ...mapActions(['getFormationById']),
        ...mapGetters(['formation', 'comments']),
    },

    data() {
        return {
            dialog: false,
            valid: false,
            comment: '',
            name: '',
            code: '',
            info: null,
            nameRules: [
                v => !!v || 'Nom requis',
                v => (v && v.length <= 20) || '20 caractères maximum',
            ],
            commentRules: [
                v => !!v || 'Commentaire requis',
                v => (v && v.length <= 1000) || '1000 caractères maximum',
            ],
            codeRules: [
                v => !!v || 'Code requis',

            ],

        }
    },

    async created() {
        const id = this.$route.params.id;
        this.$store.dispatch("getFormationById", { id });
        // this.getFormationById(id);
        await this.getFormationComments({ id });

    },

    methods: {
         ...mapActions(['postComment', 'getFormationComments']),
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        async confirm(code_com) {
            this.valid = await this.$refs.form.validate();
            const id = this.$route.params.id;
            if (this.valid && this.code === code_com) {
                const data = {
                    id_formation: id,
                    name: this.name,
                    content: this.comment,
                };
                this.postComment({ id, data });
                this.info = true;
                this.$refs.form.reset();
            } else {
                this.info = false;
                this.$refs.form.reset();
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.custom-title {
    color: white;
    text-decoration: none;
}

.custom-title:hover {
    text-decoration: underline;
    transition: color 0.5s;
}

.icon-text {
    margin-left: 25px;

}
.comment-header {
    font-weight: bold;
}

.comment-date {
    font-size: small;
    font-weight: normal;
}</style>

