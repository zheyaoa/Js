var link = new Promise((reslove,reject)=>{
    // return reject(new Error('throw new error link1'));
    return reslove();
})
link.then(() => {
    console.log('link1')
    new Promise((reslove,reject) => {
        return reject(new Error('throw new error link2'))
    })
}).then(()=>{
    console.log('link2')
}).catch(err => {
    console.log(err);
})