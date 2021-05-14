// import axios from 'axios';
import router from '../router';
import store from '../store';

export default () => {
  router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.getIsLoggedIn;
    const isAuthRequired = to.matched.some(record => record.meta.auth);

    if (isAuthRequired && !isLoggedIn) {
      return next('/login');
    } else if (!isAuthRequired && isLoggedIn) {
      return next('/');
    } else {
      return next();
    }
  });

  // axios.interceptors.response.use(null, (error) => {
  //   if (error.response.status === 401 || error.response.status === 500) {
  //     store.commit('logout');
  //     router.push('/login');
  //   }
  // });
};
