//Dependencies
const router = require('express').Router();

//Route about
router.get('/', (req, res) => {
    res.render('about', { 
        title: 'About',
        nav: '3',
        company: {
            name: 'Example name',
            address: 'Example Street 99',
            phone: '0123456789',
            email: 'example@example.com'
        }
    });
});

module.exports = router;
