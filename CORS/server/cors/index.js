const http = require('http');

const server = http.createServer((request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Methods','*');
    var data = JSON.stringify({"name":"yyx","age":20});
    console.log(data)
    response.end(data)
})
server.listen(8888,()=>{
    console.log("server run on 8888");
})


