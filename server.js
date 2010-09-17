#!/user/bin/env node

var connect = require('connect'),
    DNode = require('dnode'),
    sys = require('sys'),
    fs = require('fs');

var raphael = fs.readFileSync(__dirname + '/raphael-min.js');
var colourwheel = fs.readFileSync(__dirname + '/js/colorwheel.js');
var html = { index : fs.readFileSync(__dirname + '/index.html') };

function bundleScript () {
    return ('js/path js/drawing js/tools')
        .split(/\s+/).map(function (filename) {
            var file = __dirname + '/' + filename + '.js';
            var src = fs.readFileSync(file).toString()
                .replace(/^(module|exports)\..*/mg, '')
                .replace(/^var \S+\s*=\s*require\(.*/mg, '')
            ;
            
            return src;
        }).join('\n');
}

server = connect.createServer(
    function (req, res) {
        if (req.url == '/browser.js') {
            res.writeHead(200, { 'Content-Type' : 'text/javascript' });
            res.end(bundleScript());
        }
        else if (req.url == '/raphael.js') {
            res.writeHead(200, { 'Content-Type' : 'text/javascript' });
            res.end(raphael);
        }
        else if (req.url == '/colorwheel.js') {
            res.writeHead(200, { 'Content-Type' : 'text/javascript' });
            res.end(colourwheel);
        }
        else {
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.end(html.index);
        }
    }
).listen(3000);

DNode(
    require('./service')
).listen({
    protocol : 'socket.io',
    server : server,
    transports : 'websocket xhr-multipart xhr-polling htmlfile'.split(/\s+/),
});

