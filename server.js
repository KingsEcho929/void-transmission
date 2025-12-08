#!/usr/bin/env node

// server.js
// 🌐 Shrine Binder — exposes courier daemons as HTTP routes (no Express)

const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function runDaemon(script, args, res) {
  const proc = spawn(script, args, { stdio: ['ignore', 'pipe', 'pipe'] });

  let output = '';
  proc.stdout.on('data', d => output += d.toString());
  proc.stderr.on('data', d => output += d.toString());

  proc.on('close', code => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: output.trim(), code }));
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve shrine
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const payload = JSON.parse(body || '{}');

      if (req.url === '/courier-keygen') {
        runDaemon('./daemon-suite/courier-keygen.js', [payload.courier], res);
      } else if (req.url === '/courier-push') {
        runDaemon('./daemon-suite/courier-push.js', [payload.recipient, payload.message], res);
      } else if (req.url === '/courier-pull') {
        runDaemon('./daemon-suite/courier-pull.js', [payload.courier], res);
      } else if (req.url === '/courier-burn') {
        runDaemon('./daemon-suite/courier-burn.js', [payload.courier], res);
      } else {
        res.writeHead(404);
        res.end('Not found');
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🌌 Shrine listening on http://localhost:${PORT}`);
});
