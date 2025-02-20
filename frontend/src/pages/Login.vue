<template>
  <v-container class="login-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10">
        <v-card class="elevation-6 mt-16">
          <v-row>
            <v-col cols="12" md="6">
              <v-card-text class="mt-12">
                <h2 class="text-center">Se connecter à votre compte</h2>
                <h5 class="text-center  grey--text ">Connectez-vous à votre compte pour pouvoir
                  continuer à créer <br>et modifier vos flux d'intégration.</h5>
                <v-row align="center" justify="center">
                  <v-col cols="12" sm="8">

                    <v-form ref="loginForm" @submit.prevent="handleLogin">
                      <v-text-field v-model.trim="login.user_email" label="Adresse e-mail " outlined dense color="blue"
                        autocomplete="false" class="mt-16"></v-text-field>
                      <v-text-field v-model.trim="login.user_password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'" name="input-10-1"
                        label="Mot de passe" hint="Au moins 8 caractères" counter @click:append="show = !show" outlined
                        dense color="blue" autocomplete="false">
                        <template v-slot:prepend-inner>
                          <v-icon size="20" class="mr-2">fas fa-lock</v-icon>
                        </template>
                      </v-text-field>

                      <v-checkbox v-model="rememberMe" label="Se souvenir de mon identifiant" class="mt-n1" color="blue">
                      </v-checkbox>
                    </v-form>
                   <!-- <v-row>
                      <v-col cols="12" sm="11">
                        <v-checkbox v-model="rememberMe" label="Se souvenir de mon identifiant" class="mt-n1"
                          color="blue">
                        </v-checkbox>
                      </v-col>
                    </v-row>-->
                    <v-btn color="blue" dark block tile class="rounded" @click="handleLogin">SE CONNECTER</v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
            <v-col cols="12" md="6" class="blue rounded-bl-xl">
              <div style="  text-align: center; padding: 180px 0;">
                <v-card-text class="white--text">
                  <h3 class="text-center ">Vous n'avez pas encore de compte ?</h3>
                  <h5 class="text-center">Mettons tout en place pour que vous puissiez commencer à
                    créer votre première <br> expérience d'intégration.</h5>
                </v-card-text>
                <v-card-action class="text-center">
                  <v-btn tile outlined dark to="/register">S'INSCRIRE</v-btn>
                </v-card-action>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      login: {
        user_email: '',
        user_password: '',
      },
      rules: {
        required: value => !!value || 'Champs obligatoires !',
        min: v => v.length >= 8 || 'Minimum 8 caractères',
        emailMatch: () => (`L'adresse e-mail et le mot de passe que vous avez saisis ne correspondent pas.`),
      },
      show: false,
      rememberMe: false,
    };
  },
  mounted() {
    // Retrieve stored credentials from local storage if "Remember Me" was checked
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
      const { user_email, user_password, rememberMe } = JSON.parse(storedCredentials);
      this.login.user_email = user_email;
      this.login.user_password = user_password;
      this.rememberMe = rememberMe;
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async handleLogin() {
      const newUser = {
        user_email: this.login.user_email,
        user_password: this.login.user_password,
      };

      // Store the credentials in local storage if "Remember Me" is checked
      if (this.rememberMe) {
        const storedCredentials = JSON.stringify({
          user_email: this.login.user_email,
          user_password: this.login.user_password,
          rememberMe: this.rememberMe,
        });
        localStorage.setItem('credentials', storedCredentials);
      } else {
        localStorage.removeItem('credentials');
      }

      await this.loginUser({ user: newUser });
    },
  },
};
</script>

<style scoped>
.login-container {
  margin-bottom: 64px
}

.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
</style>




<!-- <template>
  <v-content>
    <v-container>
        <v-card>
          <v-card-title>Login</v-card-title>

          <v-card-text>
            <v-form ref="loginForm" @submit.prevent="handleLogin">
              <v-text-field v-model.trim="login.user_email" label="Email"></v-text-field>
              <v-text-field v-model.trim="login.user_password" label="Password" type="password"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="handleLogin">Login</v-btn>
            <v-btn to="/register">Switch to Register</v-btn>

          </v-card-actions>
        </v-card>
      </v-container>
  </v-content>
</template>

<script>
// import axios from 'axios';
import { mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      login: {
        user_email: '',
        user_password: '',
      },
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    // ...mapMutations(['loginSuccess', 'loginFailed']),
    async handleLogin() {
      const newUser = {
        user_email: this.login.user_email,
        user_password: this.login.user_password,
      };
      await this.loginUser({ user: newUser });
      // await this.$store.dispatch("loginUser", {user: newUser});
    },
  },
};
</script> -->

<!-- <template>
  <v-content>
    <v-container>
      <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-form ref="loginForm" @submit.prevent="handleLogin">
            <v-text-field v-model.trim="login.user_email" label="Email"></v-text-field>
            <v-text-field v-model.trim="login.user_password" label="Password" type="password"></v-text-field>
            <v-checkbox v-model="rememberMe" label="Remember Me"></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="handleLogin">Login</v-btn>
          <v-btn to="/register">Switch to Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      login: {
        user_email: '',
        user_password: '',
      },
      rememberMe: false,
    };
  },
  mounted() {
    // Retrieve stored credentials from local storage if "Remember Me" was checked
    const storedCredentials = localStorage.getItem('credentials');
    if (storedCredentials) {
      const { user_email, user_password, rememberMe } = JSON.parse(storedCredentials);
      this.login.user_email = user_email;
      this.login.user_password = user_password;
      this.rememberMe = rememberMe;
    }
  },
  methods: {
    ...mapActions(['loginUser']),
    async handleLogin() {
      const newUser = {
        user_email: this.login.user_email,
        user_password: this.login.user_password,
      };

      // Store the credentials in local storage if "Remember Me" is checked
      if (this.rememberMe) {
        const storedCredentials = JSON.stringify({
          user_email: this.login.user_email,
          user_password: this.login.user_password,
          rememberMe: this.rememberMe,
        });
        localStorage.setItem('credentials', storedCredentials);
      } else {
        localStorage.removeItem('credentials');
      }

      await this.loginUser({ user: newUser });
    },
  },
};
</script> -->

