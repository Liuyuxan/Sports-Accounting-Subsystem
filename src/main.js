import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
import router from './router'
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import "normalize.css"
import './assets/css/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ViewUIPlus)
app.mount('#app')
