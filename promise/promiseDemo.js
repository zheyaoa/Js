function timeout(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms,'hello')
    })
}
timeout(100).then((arguments) => {
    console.log(arguments)
})

var promise = new Promise((reslove,reject) => {
    console.log('promise1');
    reslove();
    console.log('promise2');
})
promise.then(()=>{
    console.log('resolve')
})
console.log('hi')