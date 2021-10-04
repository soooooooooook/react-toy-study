import axios from "axios";

const saveToken = localStorage.getItem('token');
const config = {
    baseURL: 'https://jssampletest.herokuapp.com/api/'
}

if (saveToken) {
    const tokenToObject = JSON.parse(saveToken);
    config.headers = {'Authorization': `Bearer ${tokenToObject.accessToken}`};
}
const instance = axios.create(config);

export default instance;
