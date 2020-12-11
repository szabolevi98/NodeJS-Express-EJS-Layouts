//Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const messageModel = require(path.join(__dirname, '..', 'models', 'message'));

//Route contact
router.route('/')
.get((req, res) => {
    res.render('contact', {
        title: 'Contact',
        nav: 2
    });
})
.post(async(req, res) => {
    const messageObject = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        comment: req.body.comment
    };
    if (messageObject.name && messageObject.email && messageObject.phone && messageObject.subject && messageObject.comment)
    {
        try {
            const postMessage = new messageModel(messageObject);
            await postMessage.save();
            res.render('contact', { 
                title: 'Contact',
                nav: 2,
                formSuccess: true,
                message: messageObject,
            });

        } 
        catch (err) {
            res.render('error', { 
                title: 'Error',
                nav: '2',
                specificMessage: err.message
            });
        }
    }
    else {
        res.send('Error: Missing details.');
    }
});

module.exports = router;
