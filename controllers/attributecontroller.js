const express = require('express');
const router = express.Router();
let validateSession = require('../middleware/validate-session');

const Attribute = require('../db').import('../models/attribute');


//Create Attribute entry - works
router.post('/new', validateSession, (req, res) => {
    const attributeEntry = {
        hp: req.body.attribute.hp,
        strength: req.body.attribute.strength,
        speed: req.body.attribute.speed,
        agility: req.body.attribute.agility,
        intelligence: req.body.attribute.intelligence,
        charisma: req.body.attribute.charisma,
        characterId: req.body.attribute.characterId
    }
    Attribute.create(attributeEntry)
    .then(attribute => res.status(200).json(attribute))
    .catch(err => res.status(500).json({ error: err }))
});


//Get Attribute entry by characterId - works
router.get('/character/mine', validateSession, function (req, res) {
    
    Attribute.findAll({
        where: { characterId: req.body.attribute.characterId }
    })
    .then(attributes => res.status(200).json(attributes))
    .catch(err => res.status(500).json({ error: err }))
});

//Get Attribute Entry by ID
router.get('/:id', validateSession, function (req, res) {
    
    Attribute.findAll({
        where: { id: req.params.id }
    })
    .then(attributes => res.status(200).json(attributes))
    .catch(err => res.status(500).json({ error: err }))
});

//Update Attribute entry - works
router.put('/update/attribute', validateSession, function (req, res) {
    const updateAttributeEntry = {
        hp: req.body.attribute.hp,
        strength: req.body.attribute.strength,
        speed: req.body.attribute.speed,
        agility: req.body.attribute.agility,
        intelligence: req.body.attribute.intelligence,
        charisma: req.body.attribute.charisma,
    };

    const query = { where : { characterId: req.body.attribute.characterId }};

    Attribute.update(updateAttributeEntry, query)
    .then((attributes) => res.status(200).json(attributes))
    .catch((err) => res.status(500).json({ error: err }));
})

//Delete Attribute Entry - works
router.delete('/delete', validateSession, function (req,res) {
    const query = {where: { characterId: req.body.attribute.characterId }};

    Attribute.destroy(query)
    .then(() => res.status(200).json({ message: 'Attribute Deleted' }))
    .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router;