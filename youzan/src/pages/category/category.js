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
            toplist:null,
            topindex:0,
            subdata:null,
            rankdata:null,
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
        },
        getsublist(index){
            console.log(index)
            this.topindex = index
            if(index === 0 ){
                axios.get(url.ranklist).then(res=>{this.rankdata = res.data.data})
            }else{
                axios.get(url.sublist).then(res=>{this.subdata = res.data.data})
            }
            
        },
        // getranklist(){
        //     axios.get(url.ranklist).then(res=>{this.rankdata = res.data.data})
        // },
    },
    created(){
        this.getToplist()
        // this.getranklist()
        this.getsublist(0)
    }
})