import './assets/main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
const NotFound = () => import('./components/NotFound.vue')
const GeShan1 = () => import('./components/WastewaterCyc/GeShan1.vue')
const ChenSha1 = () => import('./components/WastewaterCyc/ChenSha1.vue')
const ChenSha2 = () => import('./components/WastewaterCyc/ChenSha2.vue')
const ChenSha3 = () => import('./components/WastewaterCyc/ChenSha3.vue')
const ChuChen3 = () => import('./components/WastewaterCyc/ChuChen3.vue')
const WastewaterCyc = () => import('./components/WastewaterCyc/WastewaterCyc.vue')
const WaterCyc = () => import('./components/WaterCyc/WaterCyc.vue')
const ServiceAgreement = () => import('./components/ServiceAgreement.vue')
const PrivacyPolicy = () => import('./components/PrivacyPolicy.vue')

const routes = [
  { path: '/', component: WastewaterCyc },
  { path: '/forms', component: WastewaterCyc },
  { path: '/forms.html', component: WastewaterCyc },
  { path: '/WastewaterCyc', component: WastewaterCyc },
  { path: '/WaterCyc', component: WaterCyc },
  { path: '/Geshan1', component: GeShan1 },
  { path: '/ChenSha1', component: ChenSha1 },
  { path: '/ChenSha2', component: ChenSha2 },
  { path: '/ChenSha3', component: ChenSha3 },
  { path: '/ChuChen3', component: ChuChen3 },
  { path: '/:pathMatch(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app= createApp(App)
app.use(router)
app.mount('#app')

