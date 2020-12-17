//Dependencies
const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
require('dotenv').config();

//App config
app.use(expressLayouts);
app.set('layout', path.join('layouts', 'without_jumbotron'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//Routes (external)
const routes = require(path.join(__dirname, 'routes', 'routes'));
app.use('/', routes);

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connecting to the database...')
);

//Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is starting at port: ' + port);
});
