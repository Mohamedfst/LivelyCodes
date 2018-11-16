var http = require('http');
var fs = require('fs');
var path = require('path');
const { parse } = require('querystring');

const server = http.createServer(function(req, res) {

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            var r = JSON.stringify(parse(body));
            console.log(
                r
            );
            res.write("Success Page ==> data ==> ");
            res.end(r);
        });
    } else {

        if (req.url === "/") {
            fs.readFile("./index.html", "UTF-8", function(err, html) {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(html);
            });
        } else if (req.url.match("\.css$")) {
            var cssPath = path.join(__dirname, req.url);
            var fileStream = fs.createReadStream(cssPath, "UTF-8");
            res.writeHead(200, { "Content-Type": "text/css" });
            fileStream.pipe(res);
        } else {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("No Page Found");
        }
    }

});


server.listen(3000);