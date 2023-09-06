const restify = require ('restify');
const routes = require('../http/routes');
const cors = require('../server/cors');
const server = restify.createServer();
const jwtMiddleware = require('./jwt-middleware')

const exclusions = ['/login']

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser())
server.use(jwtMiddleware({ exclusions }));

routes(server);

module.exports = server;