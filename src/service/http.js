import axios from "axios";

const config = {
    baseURL: 'https://jssampletest.herokuapp.com/api/'
}

const instance = axios.create(config);

export const interceptors = (store) => {
    instance.interceptors.request.use(
        (config) => {
            const saveToken = localStorage.getItem('token');
            if (saveToken) {
                const tokenToObject = JSON.parse(saveToken);
                config.headers = {'Authorization': `Bearer ${tokenToObject.accessToken}`};
            }
            return config;
        }
    )

    instance.interceptors.response.use(
        (response) => {
            return response;
        }, (error) => {
            if (error.response.status === 401) {
                console.log('user/logout');
                store.dispatch(
                    {type: 'user/logout'}
                );
            }
            return Promise.reject(error);
        }
    )
}


export default instance;
