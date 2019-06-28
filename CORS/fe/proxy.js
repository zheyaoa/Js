const http = require('http');
const fs = require('fs');
const url = require('url');
const request = 
http.createServer(function(req,res){
    var pathname = url.parse(req.url).pathname;
    if(pathname === '/'){
        readFileAndResponse('./index.html',res);
    }else{
        http.get('http://localhost:8888',(resp)=>{
            let data = '';
            resp.on('data',chunk=>{
                data+=chunk;
            })
            resp.on('end',()=>{
                res.end(data)
            })
        })
    }
}).listen(8080,()=>{
    console.log("server run on 8080")
});
function readFileAndResponse(pathname,response){
    fs.readFile(pathname,'utf8',function(err,data){
    //文件不存在或读取错误返回404，并打印page not found
        if(err){
            response.writeHead(404);
            response.end('page not found');
        }else{
        //读取成功返回相应页面信息
            response.end(data);
        }
    });
}