import axios from 'axios'
import url from 'js/api.js'

function fetch(url,data){
    return new Promise((resolve,reject) => {
        axios.post(url,data).then(res =>{
            if(res.data.status === 200) {
                resolve(res.data)
            } 
        }).catch(res => {
            resolve(res)
        })
        
    })
}

export default fetch