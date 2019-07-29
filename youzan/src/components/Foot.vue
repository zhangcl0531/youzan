<template>
    <div class="bottom-nav">
      <ul>
        <li v-for="(item, index) in navConfig" :key="index" :class="{active:index==curIndex}" @click="changeNav(item,index)">
          <a><i :class="item.icon"></i>
            <div>{{item.name}}</div>
          </a>
        </li>
        <!-- <li><a href="category.html"><i class="icon-category"></i>
            <div>分类</div>
          </a></li>
        <li><a href="cart.html"><i class="icon-cart"></i>
            <div>购物车</div>
          </a></li>
        <li><a href="member.html"><i class="icon-user"></i>
            <div>我</div>
          </a></li> -->
      </ul>
    </div>
</template>


<script>
import qs from 'qs'
console.log('qs',qs)
// 通过qs获取index，并赋值给当前的index
let cindex = qs.parse(location.search.substr(1)).cindex

let navConfig = [{
  name:'有赞',
  icon:'icon-home',
  href:'index.html'
},{
  name:'分类',
  icon:'icon-category',
  href:'category.html'
},{
  name:'购物车',
  icon:'icon-cart',
  href:'cart.html'
},{
  name:'我',
  icon:'icon-user',
  href:'member.html'
}]


export default {
    name:'Foot',
    data() {
      return {
        navConfig,
        curIndex:parseInt(cindex) || 0
      }
    },
    methods: {
      changeNav(item,index){
        location.href = `${item.href}?cindex=${index}`
      }
    },
}
</script>


<style scoped>

</style>
