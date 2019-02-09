const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req, res) => {
    res.end('Hello Client!');
});


const PORT = 3000;
server.listen(PORT, () => console.log(`Server is on port: ${PORT}`));