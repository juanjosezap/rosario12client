import axios from "axios";

export default axios.create({
  baseURL: "http://pautarosario12.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
