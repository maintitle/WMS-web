import App from './App.vue'
import Vue from 'vue'
import router from './router'
import '@/styles/index.css'
import '@/styles/public.css'
import '@/styles/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons' // icon
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
