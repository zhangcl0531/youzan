import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'


var app = new Vue({
    el:'#app',
    data() {
        return {
            lists:null,
        }
    },
    methods:{
        getData(){
            axios.get(url.hotlists)
            .then(res=>{
                console.log(res.data.lists)
                this.lists = res.data.lists
            })
            .catch(function(err){
                console.log(err)
            })
        }
        
    },
    beforeMount(){
        this.getData()
    }
})