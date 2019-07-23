import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import Foot from 'components/Foot.vue'


var app = new Vue({
    el:'#app',
    data() {
        return {
            toplist:null
        }
    },
    components:{
        Foot
    },
    methods:{
        getToplist(){
            axios.get(url.toplist)
            .then(res=>{
                this.toplist = res.data.lists
            })
            .catch(function(err){
                console.log(err)
            })
        }
    },
    created(){
        this.getToplist()
    }
})