const Hapi = require('@hapi/hapi');
const bookRoutes = require('./routes/bookRoutes');

const server = Hapi.server({
  port: 9000,
  host: 'localhost',
});

server.route(bookRoutes);

const init = async () => {
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
