//const doc = {
//    info: {
//        title: 'Education App Node.js, Mongodb API',
//        description: 'Description',
//    },
//    basePath: '/api/',
//    host: config.host + ':' + config.port,
//    schemes: ['http'],
//};
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes.js']; // root file where the route starts.
// Extended: https://swagger.io/specification/#infoObject

swaggerAutogen(outputFile, endpointsFiles);