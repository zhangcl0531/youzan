import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

new Vue({
    el:'.container',
    data() {
        return {
            lists:null
        }
    },
    computed:{

    },
    created(){
        this.getlist()
    },
    methods: {
        getlist(){
            axios.get(url.cartlist)
            .then(res=>{
                 let lists = res.data.cartList
                 lists.forEach(shop => {
                    shop.checked = true
                    shop.goodsList.forEach(good => {
                        good.checked = true
                    })
                });
                this.lists = lists
            })
        },
        selectgood(good){
            good.checked = !good.checked

        },
        selectshop(shop){
            shop.checked = !shop.checked
            // console.log(this.lists.shop)
            // if(shop.checked){
            //     this.lists.shop.forEach(good=>{
            //         good.checked = true
            //     })
            // }else{
            //     this.lists.shop.forEach(good=>{
            //         good.checked = false
            //     })
            // }
        }
    },
})