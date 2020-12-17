//Dependencies
const express = require('express');
const app = express();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
require('dotenv').config();

//App config
app.set('view engine', 'ejs');
app.set('layout', path.join('layouts', 'without_jumbotron'));
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.locals.rmWhitespace = true;

//Routes (external)
const routes = require(path.join(__dirname, 'routes', 'routes'));
app.use('/', routes);

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    (err) => {
      if (err) {
          console.log('Unable to connect to the database:', err.message);
      }
      else {
          console.log('Connected to database successfully!');
      }
    }
);

//Server start
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is starting at port: ' + port);
});
