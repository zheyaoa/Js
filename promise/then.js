const p1 = new Promise((resolve,reject) => {
    setTimeout( () => {
        reject('p2')
    },3000)
})
const p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(p1);
        console.log(p1);
    },1000)
})
p2.then((res)=>{console.log(res)}).catch((err)=>{console.log(err)})