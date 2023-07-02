const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

/********Middlewares *******/

//use body parser
app.use(bodyParser.urlencoded({extended:false}));

//use cookie parser
app.use(cookieParser());

//use static files
app.use(express.static('./assets'));

//use express-ejs-layout
app.use(expressLayouts);
//extract style and script and subpages in the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
})