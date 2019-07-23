<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="(item, index) in topbanner" :key="index">
                <a class="js-no-follow" :href="item.clickUrl">
                  <img class="goods-main-photo fadeIn"
                    :src="item.img">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>


<script>

// 引入Swiper插件
import Swiper from 'swiper'
import 'swiper/dist/js/swiper.min.js'
import 'swiper/dist/css/swiper.min.css'

export default {
    name:'Swipe',
    props:['topbanner'],
    // data() {
    //     return {
    //         topbanner: this.topbanner
    //     }
    // },

    mounted() {
        //实例化Swiper
        new Swiper('.swiper-container',{
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay:true,
            // effect : 'fade',
    
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            },
        })
    },
}
</script>

<style scoped>
 .swiper-slide img {
     width: 100%;
     height: 100%
 }

</style>
