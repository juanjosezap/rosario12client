import axios from "axios";

export default axios.create({
  baseURL: "https://pautarosario12.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
