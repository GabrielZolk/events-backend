require('dotenv').config();
const server = require('./server/index');
const port = process.env.PORT || '3456';

server.listen(port);