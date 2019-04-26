var p1 = new Promise((resolve,reject)=>{
    reject('error p1')
}).catch(err => {
    console.log(err)
})

var p2 = new Promise((resolve,reject)=>{
    reject('error p2')
})

Promise.all([p1,p2]).catch((err)=>{
    console.log('err:',err)
})