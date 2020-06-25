import axios from "axios";

export default axios.create({
    baseURL:"https://us-central1-wheel-of-fortune-b4c69.cloudfunctions.net/api",
    responseType:"json"
})