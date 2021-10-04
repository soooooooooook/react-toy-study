import axios from "axios";

const instance = axios.create({
    baseURL: 'https://jssampletest.herokuapp.com/api/'
})

export default instance;
