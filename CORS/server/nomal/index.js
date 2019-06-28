const http = require('http')

const server = http.createServer((req,res)=>{
    const data = {
        name:"zz",
        age:'19'
    }
    res.end(data)
})

server.listen(8888,()=>{
    console.log("server listen on 8888");
})