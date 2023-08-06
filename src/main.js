import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia' // 导入 Pinia
// import router from './router'

// 在main.js或App.vue中引入FontAwesome相關元件
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons'
// 將使用到的Icon加入FontAwesome的圖示庫
library.add(faUser, faEnvelope,fas)


// ---------------------------------------- //

const app = createApp(App)

// 全域註冊FontAwesome元件
app.component('font-awesome-icon', FontAwesomeIcon)

.use(createPinia()) // 启用 Pinia
// app.use(router)

app.mount('#app')
