<template>
  <div class="container-bottom-menu" style="cursor:pointer;">
    <div class="container " style="min-height: 597px;">
      <div class="block-list address-list section section-first js-no-webview-block">
        <a class="block-item js-address-item address-item " 
          v-for="list in lists" :key="list.id"
          @click="toedit()"
          :class="{'address-item-default':list.isDefault}">
          <div class="address-title">{{list.name}} {{list.tel}}</div>
          <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
          <a class="address-edit">修改</a>
        </a>
        <a class="block-item js-address-item address-item "
          href="https://pfmarket.youzan.com/user/address/form?m_alias=3nu78u467kddj&amp;id=69150193&amp;from=">
          <div class="address-title">tony 13112345678</div>
          <p>北京市北京市东城区天安门</p>
        </a>
      </div>

      <div v-if="lists&&!lists.length">
          没有地址，请添加
      </div>
      <div class="block stick-bottom-row center">
        <router-link class="btn btn-blue js-no-webview-block js-add-address-btn"
          to="/address/form">
          新增地址
        </router-link>
      </div>
    </div>
    <a style="display: block;" href="https://pfmarket.youzan.com/market/home?m_alias=3nu78u467kddj"
      class="ft-copyright"></a>

  </div>
</template>

<script>
import Address from 'js/adderssservice.js'
export default {
    data() {
      return {
        lists:null,
      }
    },
    created() {
      Address.list().then(res =>{
        this.lists = res.data.lists
      })
    },

    methods:{
        toedit(){
            this.$router.push({path:'/address/form'})
        }
    }
}
</script>