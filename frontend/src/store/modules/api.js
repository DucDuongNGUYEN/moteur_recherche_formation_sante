import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
    headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
});

export default instance;

// axios.defaults.baseURL = "http://localhost:5000/api";
// axios.defaults.headers.common["token"] =
//   "Bearer" + localStorage.getItem("accessToken");
