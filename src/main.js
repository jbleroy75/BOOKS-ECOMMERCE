import Vue from 'vue';
import App from './App.vue';
import router from './router';
import md5 from 'md5';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;

Vue.prototype.$md5 = md5;

Vue.use(VueAxios, axios);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
