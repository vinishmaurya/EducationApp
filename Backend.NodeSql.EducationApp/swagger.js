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
        //#region Admin Setup Routes
        './routes/admin/auth.route',
        './routes/admin/setup/common.route.js',
        './routes/admin/setup/account.route.js',
        './routes/admin/setup/form.route.js',
        './routes/admin/setup/role.route.js',
        './routes/admin/setup/user.route.js',
        './routes/admin/setup/country.route.js',
        './routes/admin/setup/state.route.js',
        './routes/admin/setup/city.route.js',
        './routes/admin/setup/map.form.role.route.js',
        './routes/admin/setup/map.form.account.route.js',
        //#endregion
        //#region Admin Setup Routes
        './routes/organization/academics/setup/masters/common.route',
        './routes/organization/academics/setup/masters/section.route',
        './routes/organization/academics/setup/masters/medium.route',
        './routes/organization/academics/setup/masters/subject.route',
        './routes/organization/academics/setup/masters/class.route',
        './routes/organization/academics/setup/masters/session.route',
        './routes/organization/academics/setup/masters/studentCategory.route',
        './routes/organization/academics/setup/masters/chapter.route',
        './routes/organization/academics/setup/masters/chapterTopics.route',
        //#endregion
    ]; // root file where the route starts.
// Extended: https://swagger.io/specification/#infoObject

swaggerAutogen(outputFile, endpointsFiles, doc);