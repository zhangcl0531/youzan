import fetch from 'js/fetch.js'
import url from 'js/api.js'

class Address {
    static list(){
        return fetch(url.addresslist)
    }

    static add(data){
        return fetch(url.addressadd,data)
    }

    static remove(id){
        return fetch(url.addressremove,id)
    }

    static update(data){
        return fetch(url.addressupdate,data)
    }

    static setdefault(id){
        return fetch(url.addresssetdefault,id)
    }
}

export default Address