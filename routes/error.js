//Dependencies
const router = require('express').Router();

//Route error
router.get('/', (req, res) => {
    res.render('error', { 
        title: 'Error',
        nav: '0',
        route: JSON.stringify(req.originalUrl)
    });
});

module.exports = router;
