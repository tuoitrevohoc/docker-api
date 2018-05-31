const restify = require('restify');
const getCounter = require('./db');

let alive = true;

const server = restify.createServer();

server.get('/api/health', (request, response, next) => {
  if (alive) {
    response.send(200, 'alive');
  } else {
    response.send(400, 'dead');
  }
});

server.get('/api', (request, response, next) => {
  response.send('Hello From API!!');
  next();
});

server.get('/api/counter', async (request, response, next) => {
  const counter = await getCounter();
  response.send(200, counter);
  next();
});

server.get('/api/kill', () => {
  process.exit(0);
});

server.get('/api/killSync', async (request, response, next) => {
  alive = false;
  response.send('App Killed');
  next();
});

server.listen(8080, () => {
  console.log("Server started.");
});
