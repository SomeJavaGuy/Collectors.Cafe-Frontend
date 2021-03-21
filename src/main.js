import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import { config } from '@/config'

Vue.use(VueResource)

Vue.http.interceptors.push(function(request) {
  // console.log(request.url)
  if (request.url.includes(config.backendAPIURL)) {
    // console.log('this is a backend API call')

    const localSavedJwtToken = localStorage.getItem(config.localStorageKey.login)
    if (localSavedJwtToken) {
      const code = 'Bearer ' + localSavedJwtToken
      request.headers.set('Authorization', code)
      // console.log('VueResource added jwtToken')
    }
    else {
      // console.log('VueResource: jwtToken not available')
    }

    // Handle responses
    return function(response) {
      if (response.status === 401 || response.status === 419
        || response.status === 440 ) {
        console.log('401/419/440 response received')
        localStorage.removeItem(config.localStorageKey.login)
        location.reload()
      }
    }

  }

})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
