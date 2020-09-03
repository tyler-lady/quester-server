const express = require('express');
const router = express.Router();

const Class = require('../models/charClasses.json')

//We are going to focus on pulling classes, by race to hopefully simplify reaching the objects

//Get Giant Classes
router.get('/giant', (req, res) => {
    if(Class !== undefined){
        res.status(200).send(Class[0])
    }else{
        res.status(404).send()
    }
})

//Get Human Classes
router.get('/human', (req, res) => {
    if(Class !== undefined){
        res.status(200).send(Class[1])
    }else{
        res.status(404).send()
    }
})

//Get Elf Classes
router.get('/elf', (req, res) => {
    if(Class !== undefined){
        res.status(200).send(Class[2])
    }else{
        res.status(404).send()
    }
})

//Get Orc Classes
router.get('/orc', (req, res) => {
    if(Class !== undefined){
        res.status(200).send(Class[3])
    }else{
        res.status(404).send()
    }
})


module.exports = router;