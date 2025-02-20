<template>
    <v-container class="login-container">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10">
                <v-card class="elevation-6 mt-16">
                    <v-window v-model="step">
                        <v-window-item :value="2">
                            <v-row>
                                <v-col cols="12" md="6" class="blue rounded-br-xl">
                                    <div style="  text-align: center; padding: 180px 0;">
                                        <v-card-text class="white--text">
                                            <h3 class="text-center ">Avez-vous déjà un compte ?</h3>
                                            <h5 class="text-center">Connectez-vous à votre compte pour pouvoir continuer à
                                                créer et<br> modifier vos flux d'intégration.</h5>
                                        </v-card-text>
                                        <div class="text-center">
                                            <v-btn tile outlined dark to="/login">SE CONNECTER</v-btn>
                                        </div>
                                    </div>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <v-card-text class="mt-12">
                                        <h2 class="text-center">Créer un compte</h2>
                                        <h5 class="text-center  grey--text ">Mettons tout en place pour que vous puissiez
                                            commencer à créer votre <br>
                                            première expérience d'intégration.</h5>
                                        <v-row align="center" justify="center">
                                            <v-col cols="12" sm="8">
                                                <v-form ref="registerForm" @submit.prevent="handleRegister">
                                                    <v-text-field v-model.trim="register.user_name" label="Nom et Prénom"
                                                        outlined dense color="blue" autocomplete="false" class="mt-4" />

                                                    <v-text-field v-model.trim="register.user_email"
                                                        label="Votre adresse email" outlined dense color="blue"
                                                        autocomplete="false">
                                                        <template v-slot:prepend-inner>
                                                            <v-icon size="20" class="mr-2">mdi-email</v-icon>
                                                        </template>
                                                    </v-text-field>

                                                    <v-text-field v-model.trim="register.user_password"
                                                        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                                        :rules="[rules.required, rules.min]"
                                                        :type="show ? 'text' : 'password'" name="input-10-1"
                                                        label="Choisissez un mot de passe" hint="Au moins 8 caractères"
                                                        counter @click:append="show = !show" outlined dense color="blue"
                                                        autocomplete="false">
                                                        <template v-slot:prepend-inner>
                                                            <v-icon size="20" class="mr-2">fas fa-lock</v-icon>
                                                        </template>
                                                    </v-text-field>
                                                </v-form>

                                                <!-- <v-row class="mb-2 ml-0">
                                                    <v-checkbox v-model="checkbox">
                                                        <template v-slot:label>
                                                            <div>
                                                                J'accepte les
                                                                <v-tooltip bottom>
                                                                    <template v-slot:activator="{ on }">
                                                                        <a target="_blank" href="https://vuetifyjs.com"
                                                                            @click.stop v-on="on">
                                                                            Conditions d'Utilisation
                                                                        </a>
                                                                    </template>
                                                                    Opens in new window
                                                                </v-tooltip>

                                                            </div>
                                                        </template>
                                                    </v-checkbox>
                                                </v-row>-->

                                                <v-btn color="blue" dark block tile
                                                    @click="handleRegister">S'INSCRIRE</v-btn>

                                                <div class="d-flex  justify-space-between align-center mx-10 mb-11">

                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-col>
                            </v-row>
                        </v-window-item>
                    </v-window>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// import axios from 'axios';
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            register: {
                user_name: '',
                user_email: '',
                user_password: '',
            },
            show: false,
            rules: {
                required: value => !!value || 'Champs obligatoires !',
                min: v => v.length >= 8 || 'Minimum 8 caractères',
                emailMatch: () => (`L'adresse e-mail et le mot de passe que vous avez saisis ne correspondent pas.`),
            },
        };
    },
    methods: {
        ...mapActions(['registerUser']),
        ...mapMutations(['registerFailed']),
        async handleRegister() {
            const registerData = {
                user_name: this.register.user_name,
                user_email: this.register.user_email,
                user_password: this.register.user_password,
            };

            await this.registerUser({ user: registerData });
        },

        // async handleRegister() {
        //     try {
        //         const response = await axios.post('http://localhost:5000/api/users/register', {
        //             user_name: this.register.user_name,
        //             user_email: this.register.user_email,
        //             user_password: this.register.user_password,
        //         });
        //         console.log('Register:', response.data);
        //         this.$router.push('/login');
        //     } catch (error) {
        //         console.error('Register Error:', error);
        //     }
        // },
    },
};
</script>

<style scoped>
.login-container {
    margin-bottom: 64px
}

.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
</style>




<!--
    <template>
    <v-content>
        <v-container class="login-container">
            <v-row align="center" justify="center">
                <v-col cols="6">
                    <v-card>
                        <v-card-title>Register</v-card-title>
                        <v-card-text>
                            <v-form ref="registerForm" @submit.prevent="handleRegister">
                                <v-text-field v-model.trim="register.user_name" label="Name"></v-text-field>
                                <v-text-field v-model.trim="register.user_email" label="Email"></v-text-field>
                                <v-text-field v-model.trim="register.user_password" label="Password"
                                    type="password"></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="handleRegister">Register</v-btn>
                            <v-btn to="/login">Switch to Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>
  
<script>
// import axios from 'axios';
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            register: {
                user_name: '',
                user_email: '',
                user_password: '',
            },
        };
    },
    methods: {
        ...mapActions(['registerUser']),
        ...mapMutations(['registerFailed']),
        async handleRegister() {
            const registerData = {
                user_name: this.register.user_name,
                user_email: this.register.user_email,
                user_password: this.register.user_password,
            };

            await this.registerUser({ user: registerData });
        },

        // async handleRegister() {
        //     try {
        //         const response = await axios.post('http://localhost:5000/api/users/register', {
        //             user_name: this.register.user_name,
        //             user_email: this.register.user_email,
        //             user_password: this.register.user_password,
        //         });
        //         console.log('Register:', response.data);
        //         this.$router.push('/login');
        //     } catch (error) {
        //         console.error('Register Error:', error);
        //     }
        // },
    },
};
</script>
<style lang="scss" scoped>
.login-container {
    margin-bottom: 64px
}
</style>-->