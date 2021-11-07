import {createApp} from 'vue'
import App from './App'
import router from './routes/index.js'
import store from './store/index.js'
import loadImage from './plugins/loadImage'

createApp(App)
    .use(router) // $route, $router
    .use(store) // $store
    .use(loadImage)
    .mount('#app')