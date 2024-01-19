import axios from "axios";

export default axios.create({
  baseURL: "https://65a8e218219bfa371867d859.mockapi.io",
  headers: {
    "Content-type": "application/json"
  }
});
