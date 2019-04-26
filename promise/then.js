const p1 = new Promise((resolve,reject) => {
    setTimeout( () => {
        reject(new Error('throw a error'))
    },3000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(p1);
    },1000)
})
p2.then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})