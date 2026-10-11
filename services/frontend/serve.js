// tiny static server for local dev
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, fs.existsSync(path.join(__dirname, 'dist')) ? 'dist' : 'src');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

http
  .createServer((req, res) => {
    const file = path.join(root, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('not found');
      }
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/plain' });
      res.end(data);
    });
  })
  .listen(8080, () => console.log('frontend on http://localhost:8080'));
