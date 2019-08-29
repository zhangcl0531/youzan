import './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import Volecity from 'velocity-animate'
import Cart from 'js/cartService.js'

new Vue({
  el: '.container',
  data() {
    return {
      lists: null,
      total: 0,
      editingshop: null,
      editingshopindex: -1,
      removepopup: false,
      removeData: null,
      removeMsg: '确定要删除该商品吗？'
    }
  },
  computed: {
    allsetected: {
      get() {
        if (this.lists && this.lists.length) {
          return this.lists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set(newval) {
        this.lists.forEach(shop => {
          shop.checked = newval
          shop.goodsList.forEach(good => {
            good.checked = newval
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if (this.editingshop) {
          return this.editingshop.removechecked
        }
        return false
      },
      set(newval) {
        if (this.editingshop) {
          this.editingshop.removechecked = newval
          this.editingshop.goodsList.forEach(good => {
            good.removechecked = newval
          })
        }
      }
    },
    selectlists() {
      if (this.lists && this.lists.length) {
        let arr = []
        let total = 0
        this.lists.forEach(shop => {
          shop.goodsList.forEach(good => {
            if (good.checked) {
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
    removelists() {
      if (this.editingshop) {
        let arr = []
        this.editingshop.goodsList.forEach(good => {
          if (good.removechecked) {
            arr.push(good)
          }
        })
        return arr
      }
      return []
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    getlist() {
      axios.get(url.cartlist)
        .then(res => {
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
    selectgood(shop, good) {
      //判断处于编辑状态还是正常状态
      let attr = this.editingshop ? 'removechecked' : 'checked'
      good[attr] = !good[attr]
      //遍历商品列表，如果good.checked都是true则shop.checked为true
      shop[attr] = shop.goodsList.every(good => {
        return good[attr]
      })

    },
    selectshop(shop) {
      let attr = this.editingshop ? 'removechecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(good => {
        good[attr] = shop[attr]
      })
    },
    selectall() {
      let attr = this.editingshop ? 'allRemoveSelected' : 'allsetected'
      this[attr] = !this[attr]
    },
    edit(shop, shopindex) {
      shop.editing = !shop.editing
      if (shop.editing) {
        shop.editingMsg = '完成'
        this.editingshop = shop
        this.editingshopindex = shopindex
      } else {
        shop.editingMsg = '编辑'
        this.editingshop = null
        this.editingshopindex = -1
      }
      this.lists.forEach((item, i) => {
        if (shopindex !== i) {
          item.editing = false
          item.editingMsg = '编辑'
        }
      })
    },
    reduce(good) {
      if (good.number === 1) return
      axios.post(url.cartreduce, {
        id: good.id,
        number: 1
      }).then(res => {
        good.number--
      })
    },
    add(good) {
      // axios.post(url.cartupdate, {
      //   id: good.id,
      //   number: 1
      // }).then(res => {
      //   good.number++
      // })
      Cart.add(good.id).then(res =>{
        good.number++
      })

    },
    remove(shop, good, shopindex, goodindex) {
      this.removepopup = true
      this.removeData = {
        shop,
        good,
        shopindex,
        goodindex
      }
    },
    removeList() {
      this.removepopup = true
      this.removeMsg = `确定将所选 ${this.removelists.length} 个商品删除？`
    },
    removeConfirm() {
      console.log('删除')
      if (this.removeMsg === '确定要删除该商品吗？') {
        let {
          shop,
          good,
          shopindex,
          goodindex
        } = this.removeData
        axios.post(url.cartremove, {
          id: good.id
        }).then(res => {
          shop.goodsList.splice(goodindex, 1)
          if (!shop.goodsList.length) {
            this.lists.splice(shopindex, 1)
            this.removeshop()
          }
          this.removepopup = false
        })
      }else {
          let ids = []
          this.removelists.forEach(good => {
              ids.push(good.id)
          })
          axios.post(url.cartmrremove,{
              ids
          }).then(res=>{
              let arr = []
              this.editingshop.goodsList.forEach(good => {
                  let index = this.removelists.findIndex(item => {
                      return item.id == good.id
                  })
                  if(index === -1){
                      arr.push(good)
                  }
              })
              if(arr.length){
                  this.editingshop.goodsList = arr
              }else{
                  this.lists.splice(this.editingshopindex,1)
                  this.removeshop()
              }
              this.removepopup = false
          })

      }

    },
    removeshop() {
      this.editingshop = null
      this.editingshopindex = -1
      this.lists.forEach(shop => {
        shop.editing = false
        shop.editingMsg = '编辑'
      })
    },
    start(e,good){
      good.startx = e.changedTouches[0].clientX
    },
    end(e,shopindex,goodindex,good){
      let endx = e.changedTouches[0].clientX
      let left = '0'
      console.log(endx,good.startx)
      if(good.startx - endx > 50){
        left = '-60px'
      }
      if(endx - good.startx > 50){
        left = '0px'
      }
      Volecity(this.$refs[`goods-${shopindex}-${goodindex}`],{
        left
      })
      
    }
  },
})
