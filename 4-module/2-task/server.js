const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');
let writeFile,limitFile;
const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'POST':
    if (pathname.includes('/')) {
      res.statusCode = 400;
      res.end('Not supported');
};
    writeFile = fs.createWriteStream(filepath, {"flags": "wx"});
    limitFile = new LimitSizeStream({limit: 1024*1024});

    limitFile.on('error', () => {
      fs.unlink(filepath, () => {});
      res.statusCode = 413;
      res.end('To big size');
});
    
    writeFile.on('error', (error) => {
      if (error.code === 'EEXIST') {
        res.statusCode = 409;
        res.end('File is  exists');
      }
    });

    req
     .pipe(limitFile)
     .pipe(writeFile)

       writeFile.on('close', () => {
       res.statusCode = 201;
       res.end('Success upload');
    });

    req.on('close', () => {
      fs.unlink(filepath, () => {
        res.statusCode = 500;
        res.end('Somthing went wrong');
      });
    });
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;