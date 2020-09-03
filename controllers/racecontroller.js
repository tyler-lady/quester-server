const express = require('express');
const router = express.Router();


const Race = require('../models/charRaces.json')

//Get Giant JSON data
router.get('/giant', (req, res) => {
    if(Race !== undefined){
        res.status(200).send(Race[0])
    }else{
        res.status(404).send()
    }
})

//Get Human JSON data
router.get('/human', (req, res) => {
    if(Race !== undefined){
        res.status(200).send(Race[1])
    }else{
        res.status(404).send()
    }
})

//Get Elf JSON data
router.get('/elf', (req, res) => {
    if(Race !== undefined){
        res.status(200).send(Race[2])
    }else{
        res.status(404).send()
    }
})

//Get Orc JSON data
router.get('/orc', (req, res) => {
    if(Race !== undefined){
        res.status(200).send(Race[3])
    }else{
        res.status(404).send()
    }
})


module.exports = router;