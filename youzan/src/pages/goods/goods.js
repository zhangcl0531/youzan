import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import Swipe from 'components/Swipe.vue'

let {id} = qs.parse(location.search.substr(1))
let dateilTab = ['商品详情','本店交易']

new Vue({
    el: '#app',
    data() {
        return {
            id,
            details:null,
            dateilTab,
            tabindex:0,
            deal:null,
            topbanner:null,
            skuType:1,
            showSku:false,
            skuNum:1,
            isaddcart:false,
            showaddmessage:false
        }
    },
    components:{
        Swipe
    },
    created(){
        this.getDetails()
    },
    methods:{
        getDetails(){
            axios.get(url.details,{id}).then(res=>{
                this.details = res.data.data
                this.topbanner = []
                this.details.imgs.forEach(item => {
                    this.topbanner.push({
                        clickUrl:'',
                        img:item
                    })
                });
            })
        },
        changetab(index){
            this.tabindex = index
            if(index){
                this.getdeal(id)
            }
        },
        getdeal(id){
            axios.get(url.deal,{id}).then(res=>{
                this.deal = res.data.data.lists
            })
        },
        chooseSku(type){
            this.skuType = type
            this.showSku = true
        },
        changeSkuNum(num){
            if(num<0 && this.skuNum === 1) return
            this.skuNum += num
        },
        addcart(){
            axios.post(url.cartadd,{
                id,
                number:this.skuNum
            }).then(res=>{
                if(res.data.status === 200){
                    this.showSku = false
                    this.isaddcart = true
                    this.showaddmessage = true

                    setTimeout(()=>{
                        this.showaddmessage = false
                    },1000)
                }
            })
            
        }
    },
    watch:{
        showSku(val,oldval){
            document.documentElement.style.overflow = val ? 'hidden': 'auto'
            document.querySelector('html').style.overflow = val ? 'hidden': 'auto'
            document.documentElement.style.height = val ? '100%': 'auto'
            document.querySelector('html').style.overflow = val ? '100%': 'auto'
        }
    }
})