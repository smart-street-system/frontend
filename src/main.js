import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/bootstrap.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB-Af_U0rlkWk1dxsf3uCAN5UYlN-deWjw',
    libraries: 'places',
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
