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
            lists:null,
            total:0,
            editingshop:null,
            editingshopindex: -1
        }
    },
    computed:{
        allsetected:{
            get(){
                if(this.lists&&this.lists.length){
                    return this.lists.every(shop => {
                        return shop.checked
                    })
                }
                return false
            },
            set(newval){
                this.lists.forEach(shop => {
                    shop.checked = newval
                    shop.goodsList.forEach(good =>{
                        good.checked = newval
                    })
                })
            }
        },

        selectlists(){
            if(this.lists&&this.lists.length){
                let arr = []
                let total = 0
                this.lists.forEach(shop =>{
                    shop.goodsList.forEach(good => {
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }
            return []
        },
        removelists(){

        }
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
                    shop.editing = false
                    shop.editingMsg = '编辑'
                    shop.removechecked = false
                    shop.goodsList.forEach(good => {
                        good.checked = true
                        good.removechecked = false
                    })
                });
                this.lists = lists
            })
        },
        selectgood(shop,good){
            good.checked = !good.checked
            //遍历商品列表，如果good.checked都是true则shop.checked为true
            shop.checked = shop.goodsList.every(good =>{
                return good.checked == true
            })

        },
        selectshop(shop){
            shop.checked = !shop.checked
            shop.goodsList.forEach(good =>{
                good.checked = shop.checked
            })
        },
        selectall(){
            this.allsetected =!this.allsetected
        },
        edit(shop,shopindex){
            shop.editing = !shop.editing
            if(shop.editing){
                shop.editingMsg = '完成'
                this.editingshop = shop.editing
                this.editingshopindex = shopindex
            }else{
                shop.editingMsg = '编辑'
                this.editingshop = null
                this.editingshopindex = -1
            }
            this.lists.forEach((item,i)=>{
                if(shopindex !==i ){
                    item.editing = false
                    item.editingMsg = '编辑'
                }
            })
            
            
            
        }
    },
})