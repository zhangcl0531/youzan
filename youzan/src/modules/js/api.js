var  url = {
    hotlists:'/index/hotlist',
    topbanner:'/index/banner',
    toplist:'/category/topList',
    sublist:'/category/subList',
    ranklist:'/category/rank',
    searchlist:'/search/list',
    details:'/goods/details',
    deal:'/goods/deal',
    cartadd:'/cart/add',
    cartlist:'/cart/list',
    cartreduce:'/cart/reduce',
    cartremove:'/cart/remove',
    cartupdate:'/cart/update',
    cartmrremove:'/cart/mrremove',
    addresslist:'/address/list',
    addressadd:'/address/add',
    addressremove:'/address/remove',
    addressupdate:'/address/update',
    addresssetdefault:'/address/setDefault',
}

//开发环境和真实环境的切换

var host = 'http://rap2api.taobao.org/app/mock/225380'

for (var key in url){
    url[key] = host + url[key]
}

export default url