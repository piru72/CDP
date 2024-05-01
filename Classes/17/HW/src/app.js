const Koa = require('koa');
const {koaBody} = require('koa-body');
const router = require('./routes/routes');
const dotEnv = require('dotenv');
const initDB = require('./utils/database');
const errorHandler = require('./handler/errorHandler');
const responseHandler = require('./handler/responseHandler');
// Initialize the database connection 
initDB(); 

// Load environment variables
dotEnv.config();
// Create a new Koa application and setup middllewares
const app = new Koa();
app.use(errorHandler);
app.use(responseHandler());
app.use(koaBody({includeUnparsed: true}));
app.use(router.routes())
app.use(router.allowedMethods());

// Start the server
app.listen(process.env.PORT || 8080 , () => {
    console.log('Server is running on port 8080');
});
