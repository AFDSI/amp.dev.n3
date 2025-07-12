'use strict';

const WebSocket = require('ws');

console.log('[debug] typeof WebSocket:', typeof WebSocket); // Should be 'function' or 'object'
console.log('[debug] typeof WebSocket.Server:', typeof WebSocket.Server); // Should be 'function'

if (typeof WebSocket.Server !== 'function') {
  throw new Error(
    'WebSocket.Server is not available. The ws module may be mocked or broken.'
  );
}

const WebSocketServer = WebSocket.Server;

const messages = [
  'Something thrilling is happening.',
  "There's big news, of some sort.",
  'Stay tuned for more jaw-dropping updates.',
  "You'll never believe what I'm about to tell you.",
  "Wow! I can't believe what just happened.",
  "Don't you wish you were here? I would.",
  'The thing just happened again. Go figure.',
  'This just takes my breath away.',
  "One of the most astonishing things I've ever seen.",
  'Such an extraordinary moment.',
  'This changes everything.',
  'The news never stops! Or starts.',
];

const shortestWait = 5000;
const longestWait = 10000;

function getDelay() {
  return (
    Math.floor(Math.random() * (longestWait - shortestWait)) + shortestWait
  );
}

function start(server) {
  const wss = new WebSocketServer({
    server,
    path: '/documentation/examples/api/socket/live-blog',
  });

  wss.on('connection', (ws) => {
    sendLiveBlogEntries(ws);
  });
}

function sendLiveBlogEntries(ws) {
  if (ws.readyState === ws.OPEN) {
    const index = Math.floor(Math.random() * messages.length);
    ws.send(messages[index]);
    setTimeout(() => sendLiveBlogEntries(ws), getDelay());
  }
}

module.exports.start = start;
