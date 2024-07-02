import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'

import {createRouter, createWebHistory} from 'vue-router';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import {createApp} from "vue";
import App from "@/App.vue";
import HomePage from "@/pages/homePage.vue";
import HistoryTable from "@/components/historyTable.vue";
import moment from "moment";

const app = createApp(App);

const routes = [
    {path: '/', name: 'Weather', component: HomePage},
    {path: '/history', name: 'Search history', component: HistoryTable},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});


app.use(router);

app.component('EasyDataTable', Vue3EasyDataTable);

app.config.globalProperties.$moment = moment;

app.mount('#app');










