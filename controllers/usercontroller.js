

const express = require('express');
const router = express.Router();
const validateSession = require('../middleware/validate-session');

const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//Practice route for testing
router.get('/practice', function(req, res){
    res.send('Hey!! This is a user practice route!')
})

//Signup User Route
router.post('/signup', function (req, res) {

    User.create({
        email: req.body.user.email,
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13),
        profilePicSrc: req.body.user.profilePicSrc,
    }) .then (
        function createSuccess(user) {
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

            res.json({
                user: user,
                message: 'User successfully created!', 
                sessionToken: token
            });
        })
        .catch(err => res.status(500).json({ error: err })); 
});

//Login User Route
router.post('/login', function(req, res) {
    User.findOne({
        where: {
            username: req.body.user.username
        }
    })  .then (function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                if (matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

                    res.status(200).json({ user: user,
                    message: 'User successfully logged in!',
                    sessionToken: token
                })
                } else {
                res.status(502).send ({ error: 'User does not exist.' })
                }
            });
        } else {
            res.status(500).json({ error: 'User does not exist.' })
        }
    })
        .catch (err => res.status(500).json({ error: err }))
})

//Get User - will require authorization (for editing/deleting user profiles)
router.get('/account', validateSession, (req, res) => {
    User.findAll({
        where: { id: req.user.id },
        include: 'characters'
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }))
});

//Update User
router.put('/update', validateSession, (req, res) => {
    const updateUserEntry = {
        email: req.body.user.email,
        username: req.body.user.username,
    };
    
    const query = {where: { id: req.user.id }};

    User.update(updateUserEntry, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete User
router.delete('/delete', validateSession, function (req,res) {
    const query = {where: { id: req.user.id }};

    User.destroy(query)
    .then(() => res.status(200).json({ message: 'Your Account Has Been Deleted' }))
    .catch((err) => res.status(500).json({ error: err }));
})

module.exports = router;