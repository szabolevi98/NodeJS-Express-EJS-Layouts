//Dependencies
const router = require('express').Router();
const path = require('path');
const articleModel = require(path.join(__dirname, '..', 'models', 'article'));

//Route index
router.get('/', async(req, res) => {
  res.render('index', { 
    layout: 'layouts/with_jumbotron',
    title: 'Home',
    nav: '1',
    articles: await articleModel.find().lean(),
  });
});

module.exports = router;
