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
}

//开发环境和真实环境的切换

var host = 'http://rap2api.taobao.org/app/mock/225380'

for (var key in url){
    url[key] = host + url[key]
}

export default url