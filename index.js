let http = require('http');
let fs = require('fs');
let path = require("path");
let rootpath = path.join(__dirname, 'www');
let mime = require("mime");
let server = http.createServer(function (request, response) {
    let filepath = path.join(rootpath, request.url);
    let IsExiset = fs.existsSync(filepath);
    if (IsExiset) {
        fs.readdir(filepath, function (err, files) {
            //是文件
            if (err) {
                fs.readFile(filepath, function (err, data) {
                    if (err) {
                        // console.log(err);
                    } else {
                        response.writeHead(200, {
                            'content-type': mime.getType(filepath)
                        })
                        response.end(data);
                    }
                })





                
            } else {
                if (files.indexOf('index.html') != -1) {
                    fs.readFile(path.join(filepath, 'index.html'), function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            response.end(data);
                        }
                    })
                } else {
                    let backdata = '';
                    for (let i = 0; i < files.length; i++) {
                        backdata += `<h2><a href="${
                request.url == "/" ? "" : request.url
              }/${files[i]}">${files[i]}</a></h2>`
                    }
                    response.writeHead(200, {
                        'content-type': 'text/html;charset=utf-8'
                    })
                    response.end(backdata);
                }
            }
        })



    } else {
        response.writeHead(404, {
            'content-type': 'text/html;charset=utf-8'
        })

        response.end(`

    <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
    <html><head>
    <title>404 Not Found</title>
    </head><body>
    <h1>Not Found</h1>
    <p>The requested URL /index.hththt was not found on this server.</p>
  
    `)
    }


})
server.listen(8089, '127.0.0.1', function () {
    console.log("监听127.0.0.1成功");
})