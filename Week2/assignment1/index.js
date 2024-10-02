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

// Server on port 3000
http.createServer(function(req, res) {
  console.log('createServer got request on port 3000');
  const urlPath = req.url.toLowerCase();
  switch (urlPath) {
    case '/':
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Home page Andrew - JS 2 Class');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
  }
}).listen(3000);

console.log('Server running at http://localhost:3000/');

// Server on port 8080
http.createServer(function(req, res) {
  console.log('createServer got request on port 8080');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Dr. North - Fall 2024! - Andrew');
}).listen(8080);

console.log('Server running at http://localhost:8080/');