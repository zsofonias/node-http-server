const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req, res) => {
    //get file path
    const file_path = path.join(__dirname, 'public', req.url == '/' ? 'index.html': req.url);
    const file_ext = path.extname(file_path);
    if (!file_ext){
        file_path += '.html'; //set default file to html
        file_ext = path.extname(file_path);
    }

    function getType(file_ext){
        switch(file_ext){
            case '.html': return 'text/html';
            case '.css': return 'text/css';
            case '.js': return 'text/javascript';
            case '.png': return 'image/png';
            case '.jpg': return 'image/jpg';
            case '.json': return 'application/json';
            default: return '';
        }
    }

    const content_type = getType(file_ext);

    fs.readFile(file_path, (err,data) => {
        if(err){
            if(err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname,'public','404.html'), (err, data) => {
                    if (err) throw err;
                    res.writeHead(404,{'Content-Type': 'text/html'});
                    res.end(data);
                });
            }else{
                res.writeHead(500);
                res.end(`Internal Server Error: ${err.code}`);
            }
        }else{
            res.writeHead(200, {'Content-Type': content_type});
            res.end(data);
        }
    });

});


const PORT = 3000;
server.listen(PORT, () => console.log(`Server is on port: ${PORT}`));