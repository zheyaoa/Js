const http = require('http');

const server = http.createServer((request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Methods','PUT');
    var data = JSON.stringify({"name":"yyx","age":20});
    response.end(data)
})
server.listen(8888,()=>{
    console.log("server run on 8888");
})


