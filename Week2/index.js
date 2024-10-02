import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function serveStatic(res, filePath, contentType, responseCode = 200) {
  console.log(__dirname + filePath);
  fs.readFile(__dirname + filePath, function(err, data) {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(responseCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}



http.createServer(function(req, res) {
  console.log('createServer got request');
  const urlPath = req.url.toLowerCase();
  switch (urlPath) {
    case '/':
      serveStatic(res, '/../public/home.html', 'text/html');
      break;
    case '/about':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('About');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404: Page not found.');
  }
}).listen(process.env.PORT || 3000);

console.log('Server running at http://localhost:3000/');