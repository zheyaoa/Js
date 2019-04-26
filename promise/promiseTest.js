let promise = new Promise((resolve,reject)=>{
    resolve({then:reject(42)})
})
promise.then(value => {
    console.log(value)
})
