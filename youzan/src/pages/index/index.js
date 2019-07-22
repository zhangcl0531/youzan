import 'css/common.css'
import './index.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

// 引入mint-ui
import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll);

import Foot from 'components/Foot.vue'

var app = new Vue({
    el:'#app',
    components:{
        Foot
    },
    data() {
        return {
            lists:null,
            loading:false,//表示可以继续加载
            pagenum:1,
            pagesize:6,
            allloaded:false //是否加载完毕
        }
    },
    methods:{
        getData(){
            if(this.allloaded) return //判断是否加载完毕
            this.loading = true //停止加载
            axios.get(url.hotlists,{
                params:{
                    pageNum:this.pagenum,
                    pageSize:this.pagesize
                }
            })
            .then(res=>{
                console.log(res.data.lists)
                let curlists = res.data.lists
                if(this.lists){
                    this.lists = this.lists.concat(curlists)
                }else{
                    //第一次请求数据
                    this.lists = curlists
                }
                if(curlists.length == this.pagesize){
                    // 通过判断请求到的条数是否和设定每次获取的条数相等来判断是否请求完数据
                    this.loading = false //加载完成后继续加载
                }else{
                    this.allloaded = true
                }
                this.pagenum++
                
            })
            .catch(function(err){
                console.log(err)
            })
        },
    },
    beforeMount(){
        this.getData()
    }
})