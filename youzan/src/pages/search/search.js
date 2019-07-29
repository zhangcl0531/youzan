import 'css/common.css'
import './search.css'

import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import url from 'js/api.js'
import Foot from 'components/Foot.vue'


let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    components:{
        Foot
    },
    data() {
        return {
            searchlist:null,
            keyword,
            isShow:false
        }
    },
    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            axios.get(url.searchlist,{keyword,id})
            .then(res=>{
                this.searchlist = res.data.lists
            })
        },
        move(){
            // console.log(document.documentElement.scrollTop)
            if(document.documentElement.scrollTop > 100){
                this.isShow = true
            }else{
                this.isShow = false
            }
        }
    },
})