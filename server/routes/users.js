const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    User
        .find({})
        .then(users => {
            console.log('/');
            res.status(200).json(users);
        })
        .catch(err => res.status(404).send('error'))
});

router.get('/:id', (req, res) => {
    User    
        .findById(req.params.id)
        .then(function (userID, err) {
            if(userID) {
                console.log('/:id')
                return res.status(200).json(userID)
            }else{
                console.log('error');
                res.status(404).send('User ID does not exist');
            };
        })
        // .catch(err => res.status(404).send('error'));
});

router.post('/', (req, res) => {
    var newUser = new User(req.body)
    newUser
        .save()
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
        res.status(500).send('error')
        })
   
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate()
        .then(users => {
            res.status(204).json(users);
        })
        .catch(err => {
            res.status(500).send('error')
        })
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(404).send('error')
        })
});

module.exports = router;
