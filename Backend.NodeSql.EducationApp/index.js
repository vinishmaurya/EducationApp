const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const url = 'mongodb://127.0.0.1:27017/DEV_EducationAppDB';
//const config = require('./config');
mongoose.connect(url, { useNewUrlParser: true })
//const mongo_database = mongoose.connection;
var cors = require('cors');
const formRoute = require('./routes/admin/setup/form.route');
const roleRoute = require('./routes/admin/setup/role.route');
const mapFormRoleRoute = require('./routes/admin/setup/map.form.role.route');
const userRoute = require('./routes/admin/setup/user.route');
const accountRoute = require('./routes/account.route');
const swaggerDocument = require('./swagger_output.json');
const swaggerUi = require('swagger-ui-express');
const { logger } = require('./middleware/logEvents');
const verifyJWT = require('./middleware/verifyJWT');
const errorHandler = require('./middleware/errorHandler');
const ServiceResult = require('./models/serviceResult.model');
var fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

//mongo_database.on('error', (error) => {
//    console.log(error)
//})
//mongo_database.once('connected', () => {
//    console.log('Mongo Database Connected');
//})

//const sql = require("mssql");
//sql.connect(config.sql, () => {
//    console.log('SQL Database Connected');
//})


const app = express();
app.use(express.json());

// custom middleware logger
app.use(logger);



const commonRoutes = require('./common.routes');

app.use(cors()); // Use this after the variable declaration
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(fileUpload());


// Function to serve all static files
// inside public directory.
app.use(express.static('public'));
app.use('/images/', express.static('app_images'));

app.use('/api', accountRoute);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
//This will redirect any route not handled to the index "/"
app.get('/', function (req, res) {
    res.redirect('/api-docs');
});
app.use('/api', commonRoutes);
app.use(verifyJWT);

app.use('/api', [
    formRoute,
    roleRoute,
    mapFormRoleRoute,
    userRoute
]);
//Invalid Uri
app.use(function (req, res) {
    ServiceResult.Message = "Uri Not Found!";
    ServiceResult.Description = "Oops ? Requested Uri Is Not Found!";
    ServiceResult.Result = false;
    ServiceResult.Data = null;
    res.status(200).json(ServiceResult);
});

app.use(errorHandler);

if (process.env.NODE_ENV == "development") {
    var ip = require('ip');
    ////full path of the parent dir
    var parent_dir_path = require('path').resolve(__dirname, '..')
    var config_file_path = parent_dir_path + "\\Mobile.EducationApp\\.env";
    //var data = fs.readFileSync(config_file_path, 'utf-8');
    fs.writeFileSync(config_file_path, "REACT_APP_BASE_URL=http://"+ip.address()+":3000/api", 'utf-8');
}


app.listen(3000, () => {
    console.log(`Server Started at http://localhost:${3000}`)
})


