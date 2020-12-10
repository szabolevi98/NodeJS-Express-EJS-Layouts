//Dependencies
const router = require('express').Router();

//Routes
router.use('/', require('./index'));
router.use('/article', require('./article'));
router.use('/about', require('./about'));
router.use('/contact', require('./contact'));
router.use('*', require('./error'));

module.exports = router;
