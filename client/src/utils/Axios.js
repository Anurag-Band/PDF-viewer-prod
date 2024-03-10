import axios from "axios";

const Axios = axios.create({
  baseURL: "/api/v1",
  timeout: 8000,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default Axios;
