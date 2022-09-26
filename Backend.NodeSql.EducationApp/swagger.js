const config = require('./config');
const doc = {
    info: {
        title: 'Education App Node.js API',
        description: 'Description',
    },
    basePath: '/api/',
    host: config.host + ':' + config.port,
    schemes: ['http'],
    security: [
        {
            Bearer: []
        }
    ],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "The token for authentication"
        }
    }
};
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles =
    [
        './common.routes.js',
        './routes/account.route',
        './routes/admin/setup/form.route.js',
        './routes/admin/setup/role.route.js',
        './routes/admin/setup/map.form.role.route.js',
        './routes/admin/setup/user.route.js',
    ]; // root file where the route starts.
// Extended: https://swagger.io/specification/#infoObject

swaggerAutogen(outputFile, endpointsFiles, doc);