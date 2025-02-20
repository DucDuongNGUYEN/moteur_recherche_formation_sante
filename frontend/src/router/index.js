import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Search from "../pages/Search.vue";
import DetailFormation from "../pages/DetailFormation.vue";
import DashBoardAdmin from "@/pages/DashBoardAdmin.vue";
import FormationsTable from "@/components/FormationsTable.vue";
import UsersTable from "@/components/UsersTable.vue";
import DashBoardFormateur from "@/pages/DashBoardFormateur.vue";
import FormationsFormateur from "@/components/FormationsFormateur.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/admin",
    name: "admin",
    component: DashBoardAdmin,
    children: [
      {
        path: "/users",
        name: "users",
        component: UsersTable,
      },
      {
        path: "/formationsCRUD",
        name: "formationsCRUD",
        component: FormationsTable,
      },
    ],
  },
  {
    path: "/formateur",
    name: "formateur",
    component: DashBoardFormateur,
    children: [
      {
        path: "/formateur/formations",
        name: "formation_formateur",
        component: FormationsFormateur,
      },
    ],
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/formations/:id",
    name: "formation-details",
    component: DetailFormation,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
