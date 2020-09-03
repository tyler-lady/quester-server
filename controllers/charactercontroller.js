const express = require('express');
const router = express.Router();
let validateSession = require('../middleware/validate-session');

const Character = require('../db').import('../models/character');

//Create Character - works
router.post('/create', validateSession, (req, res) => {
    const characterEntry = {
        name: req.body.character.name,
        biography: req.body.character.biography,
        race: req.body.character.race,
        class: req.body.character.class,
        isActive: req.body.character.isActive,
        isDead: false,
        userId: req.user.id
    }
    Character.create(characterEntry)
    .then(character => res.status(200).json(character))
    .catch(err => res.status(500).json({ error: err }))
});


//Get Character - works
router.get('/:id', function (req, res) {
    const query = { where : { id: req.params.id }, include: 'attribute'};

    Character.findAll(query)
    .then(character => res.status(200).json(character))
    .catch(err => res.status(500).json({ error: err }))
});


//Get All User Characters - works
router.get('/user/mine', validateSession, function (req, res) {
    
    Character.findAll({
        where: { user_id: req.user.id },
        include: 'attribute'
    })
    .then(characters => res.status(200).json(characters))
    .catch(err => res.status(500).json({ error: err }))
});

//Get My Character By isActive - works
router.get('/mine/active', validateSession, function (req, res) {
    
    Character.findAll({
        where: { isActive: true },
        include: 'attribute'
    })
    .then(character => res.status(200).json(character))
    .catch(err => res.status(500).json({ error: err }))
});

//Update Character - works
router.put('/:id', validateSession, function (req, res) {
    const updateCharacterEntry = {
        name: req.body.character.name,
        biography: req.body.character.biography,
        class: req.body.character.class,
        isActive: req.body.character.isActive,
        isDead: req.body.character.isDead
    };

    const query = { where : { id: req.params.id }};

    Character.update(updateCharacterEntry, query)
    .then((character) => res.status(200).json(character))
    .catch((err) => res.status(500).json({ error: err }));
});


//Delete Character - works
router.delete('/delete/:id', validateSession, function (req,res) {
    const query = {where: { id: req.params.id }};

    Character.destroy(query)
    .then(() => res.status(200).json({ message: 'Character Deleted' }))
    .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;