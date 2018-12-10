var http = require('http');
var fs = require('fs');
var url = require('url');
http.createServer(function(req,res){
    var hostname = req.headers.host;
    var pathname = url.parse(req.url).pathname;
    if(pathname === '/'){
    readFileAndResponse('/index.html',res);
}}).listen(8080,()=>{
    console.log("server run on 8080")
});
function readFileAndResponse(pathname,response){
    fs.readFile(pathname.substr(1),'',function(err,data){
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