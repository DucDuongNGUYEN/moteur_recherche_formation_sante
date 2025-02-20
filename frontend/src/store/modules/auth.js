import api from "./api";
import axios from "axios";
import jwt_decode from "jwt-decode";
import router from "@/router/index";

const authModule = {
  state: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  mutations: {
    loginStart(state) {
      state.login.isFetching = true;
    },
    loginSuccess(state, payload) {
      state.login.isFetching = false;
      state.login.currentUser = payload;
      state.login.error = false;
    },
    loginFailed(state) {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart(state) {
      state.register.isFetching = true;
    },
    registerSuccess(state) {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed(state) {
      state.register.isFetching = false;
      state.register.error = true;
      state.register.success = false;
    },
    logOutSuccess(state) {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logOutFailed(state) {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logOutStart(state) {
      state.login.isFetching = true;
    },
    setStateSuccess(state, refreshUser) {
      state.currentUser = refreshUser;
    },
  },
  getters: {
    getCurrentUser: (state) => state.login.currentUser,
    getCurrentUserId: (state) => state.login.currentUser.user.user_id,
    currentUserName: (state) => state.login.currentUser.user.user_name,
    getAccessToken: (state) => state.login.currentUser.accessToken,
    getLoginState: (state) => state.login,
    getRegisterState: (state) => state.register,
  },
  actions: {
    async loginUser({ commit }, { user }) {
      commit("loginStart");
      try {
        const response = await api.post("/users/login", user);
        commit("loginSuccess", response.data);
        const role = response.data.user.role;
        if (role === "USER") {
          router.push("/");
        } else if (role === "FORMATEUR") {
          router.push("/formateur");
        } else if (role === "ADMIN") {
          router.push("/admin");
        }
        console.log("Login successful");
      } catch (error) {
        commit("loginFailed", error);
        console.log("Login failed");
      }
    },

    async registerUser({ commit }, { user }) {
      commit("registerStart");
      try {
        await api.post("/users/register", user);
        commit("registerSuccess");
        router.push("/login");
        console.log("register successful");
      } catch (err) {
        commit("registerFailed");
        console.log("register failed");
      }
    },


    async logOut({ commit, getters, dispatch }) {
      commit("logOutStart");
      const id = getters.getCurrentUserId;
      const accessToken = getters.getAccessToken;
      try {
        let axiosJWT = await dispatch("createAxios");
        await axiosJWT.post(`/users/logout`, id, {
          headers: { token: `Bearer ${accessToken}` },
        });

        console.log("Logout successful");
        commit("logOutSuccess");
        router.push("/login");
      } catch (err) {
        commit("logOutFailed");
        console.error("Logout Error:", err);
        // Handle the error here, such as displaying an error message to the user
      }
    },
    async createAxios({ commit, getters, dispatch }) {
      const accessToken = getters.getAccessToken;
      const newInstance = api.create();
      newInstance.interceptors.request.use(
        async (config) => {
          let date = new Date();
          const decodedToken = jwt_decode(accessToken);
          if (decodedToken.exp < date.getTime() / 1000) {
            try {
              const data = await dispatch("refreshToken");
              console.log("Token refreshed:", refreshToken.accessToken);
              const refreshUser = {
                user: getters.getCurrentUser.user,
                accessToken: data.accessToken,
              };
              console.log("refreshUser:", refreshUser);
              commit("setStateSuccess", refreshUser);
              config.headers["token"] = "Bearer " + data.accessToken;
            } catch (error) {
              console.error("Refresh Token Error:", error);
              // Handle the error here, such as displaying an error message to the user
            }
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      return newInstance;
    },
    async refreshToken() {
      try {
        const res = await api.post(
          "/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        console.log(res);
        console.log(res.data);
        return res.data.accessToken;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
export default authModule;


