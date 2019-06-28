const sleep = (ms) => {
    console.log(111)
    return new Promise((reslove,reject)=>{
        setTimeout(reslove,ms)
    })
}

async function test(){
    await sleep(1000)
    console.log(222);
}

test()