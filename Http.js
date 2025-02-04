
const http = require("http");

const server= http.createServer((res, req )=>
{
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end("hello how are yuhhhhh")            

} )
server.listen(3000,()=>
{
    console.log("added succesfully");
})
