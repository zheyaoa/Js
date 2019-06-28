new Promise((reslove,reject)=>{
    console.log(1)
    reslove(2)
}).then((rs)=>{
    console.log(2);
})
console.log(3);