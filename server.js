global.PROJECT_NAME = 'unidirectional-shoutouts'

if (!global.PROJECT_NAME) { //« set by npm run init-dev »
	throw new Error('no project name set. did you forget to run "npm run init-dev"?')
}
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x



const bodyParser = require('body-parser');
const express = require('express');
const renderFile = require('ejs').renderFile

// Load Configuration
const appMiddleWare = require('./config/middleware.js')
const appSecrets = require('./config/secrets.js')
const connectToDB = require('./config/db-setup.js').connectToDB

// Import Routers
let indexRouter = require('./routes/indexRouter.js')
let apiRouter = require('./routes/apiRouter.js')

// Load DB User Model (for appAuthentication configuration)
let Example = require('./db/schema.js').Example


// =========
// RUN APP
// =========
const app = express()
const PORT = process.env.PORT || 3000
app.set('port', PORT)

// =========
// VIEW ENGINE
// =========
app.set('views', './public');
app.engine('html', renderFile)
app.set('view engine', 'html');

// =========
// DATABASE
// =========
connectToDB(global.PROJECT_NAME)

// =========
// APPLICATION MIDDLEWARE
// =========
app.use( express.static( __dirname + '/public/assets') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: true}) );
app.use( appMiddleWare.parseQuery )
//
// =========
// ROUTERS
// =========

app.use( '/', indexRouter )
app.use( '/api', apiRouter )

app.use(appMiddleWare.errorHandler);

app.listen(PORT,function() {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
