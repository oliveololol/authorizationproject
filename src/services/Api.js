import axios from "axios";
import router from "../Router";
import store from "../store"

export default () => {
    const instance = axios.create({
      baseURL: 'http://localhost:63746',
      // baseURL: http://10.1.9.9:8081,
      headers: {
        Authorization: `Bearer ${store.state.token}`,
      },
    });
  
    instance.interceptors.response.use(undefined, (error) => {
      if (error.response.status === 401) {
        // Тут написать обнуление store
  
  
        
        store.dispatch('setLogOut');
        store.dispatch('notice/disableNotice', {
          status: false,
          message: '',
        });
        router.replace({
          name: 'login',
        });
      } else {
        return Promise.reject(error.response.data);
      }
    });
  
    return instance;
  };