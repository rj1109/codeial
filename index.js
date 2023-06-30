const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;

//use express-ejs-layout
app.use(expressEjsLayouts);

//use express router
app.use('/', require('./routes/index'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port ${port}`);
})