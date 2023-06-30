const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8000;

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