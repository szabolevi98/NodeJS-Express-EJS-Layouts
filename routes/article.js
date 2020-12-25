//Dependencies
const router = require('express').Router();
const path = require('path');
const articleModel = require(path.join(__dirname, '..', 'models', 'article'));

//Route article
router.route('/:id')
.get(async(req, res) => {
    res.render('article', { 
        layout: path.join('layouts', 'with_jumbotron'),
        title: 'Article',
        nav: '1',
        article: await articleModel.findById(req.params.id)
    });
})
.put(async(req, res) => {
    if (req.body.password == process.env.SECRET_KEY) {
        try {
            await articleModel.findByIdAndUpdate({ _id: req.params.id },
                {
                    name: req.body.name,
                    description: req.body.description,
                    full: req.body.full.replace(/\r\n/g, '<br />')
                });
            res.render('article', { 
                layout: path.join('layouts', 'with_jumbotron'),
                title: 'Article',
                nav: '1',
                article: await articleModel.findById(req.params.id),
                articleModify: true
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
        res.render('article', { 
            layout: path.join('layouts', 'with_jumbotron'),
            title: 'Article',
            nav: '1',
            article: await articleModel.findById(req.params.id),
            wrongSecretModify: true,
            userInput: {
                name: req.body.name,
                description: req.body.description,
                full: req.body.full
            }
        });
    }
})
.delete(async(req, res) => {
    if (req.body.password == process.env.SECRET_KEY) {
        try {
            await articleModel.deleteOne({ _id: req.params.id });
            res.render('index', { 
                layout: path.join('layouts', 'with_jumbotron'),
                title: 'Home',
                nav: '1',
                articles: await articleModel.find().lean(),
                createArticle: true,
                articleDelete: true
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
        res.render('article', { 
            layout: path.join('layouts', 'with_jumbotron'),
            title: 'Article',
            nav: '1',
            article: await articleModel.findById(req.params.id),
            wrongSecretDelete: true
        });
    }
});

module.exports = router;
