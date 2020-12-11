//Dependencies
const router = require('express').Router();
const path = require('path');
const articleModel = require(path.join(__dirname, '..', 'models', 'article'));

//Route article
router.get('/:id', async(req, res) => {
    res.render('article', { 
        layout: path.join('layouts', 'with_jumbotron'),
        title: 'Article',
        nav: '1',
        article: await articleModel.findById(req.params.id)
    });
});

module.exports = router;
