import './components/member_base.css'
import './components/member.css'

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import member from './components/member.vue'
import address from './components/address.vue'
import all from './components/all.vue'
import form from './components/form.vue'

let routes = [{
    path:'/',
    component:member
},{
    path:'/address',
    component:address,
    children: [{
        path:'',
        redirect:'all'
    },
        {
        path:'all',
        component:all
    },{
        path:'form',
        component:form
    }]
}]

let router = new Router({
    routes
})


new Vue({
    el:'#app',
    router,
})