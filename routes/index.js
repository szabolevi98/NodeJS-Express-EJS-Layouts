//Dependencies
const router = require('express').Router();
const path = require('path');
const articleModel = require(path.join(__dirname, '..', 'models', 'article'));

//Route index
router.route('/')
.get(async(req, res) => {
  res.render('index', { 
    layout: path.join('layouts', 'with_jumbotron'),
    title: 'Home',
    nav: '1',
    articles: await articleModel.find().lean(),
    createArticle: true
  });
})
.post(async(req, res) => {
  const articleObject = {
      name: req.body.name,
      description: req.body.description,
      full: req.body.full.replace(/\r\n/g, '<br />')
  };
  if (articleObject.name && articleObject.description && articleObject.full) {
      try {
          const postArticle = new articleModel(articleObject);
          await postArticle.save();
          res.render('index', { 
            layout: path.join('layouts', 'with_jumbotron'),
            title: 'Home',
            nav: '1',
            articles: await articleModel.find().lean(),
            createArticle: true,
            articleSuccess: true
          });
      } 
      catch (err) {
          res.render('error', { 
              title: 'Error',
              nav: '1',
              specificMessage: err.message
          });
      }
  }
  else {
      res.render('error', { 
          title: 'Error',
          nav: '1',
          specificMessage: 'Missing Details.'
      });
  }
});

module.exports = router;
