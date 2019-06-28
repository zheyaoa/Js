const sleep = (ms) => {
    return new Promise((reslove,reject)=>{
        console.log(111)
        setTimeout(reslove,ms)
    })
}

sleep(500).then(()=>{
    console.log(222);
})