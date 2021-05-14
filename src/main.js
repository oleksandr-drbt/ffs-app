import Vue from 'vue';
import axios from 'axios';
import VeeValidate from 'vee-validate';
import VueCarousel from 'vue-carousel';
import VueMoment from 'vue-moment';
import Notifications from 'vue-notification';
import router from './router';
import store from './store'
import App from './components/App';
import authMiddleware from './middleware/auth';
import './bootstrap';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(VueCarousel);
Vue.use(VueMoment);
Vue.use(Notifications);

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;

authMiddleware();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
