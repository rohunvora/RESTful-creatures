const express = require('express')
const router = express.Router()
const fs = require('fs') // used to read json files


//index route for prehistoric creatures
router.get('/', (req, res)=>{
    // get data from dinosaurs.json
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    // render dino index with dinoData as myDinos
    res.render('prehistoric_creatures/index', {myCreature: creatureData})
})

//get the new creature form
router.get('/prehistoric_creatures/new', (req, res)=>{
    res.render('prehistoric_creatures/new')
})

//show route for creatures
router.get('/prehistoric_creatures/:id', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    //grab the id parameter and convert to int..was string
    let creatureIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/show', {myCreature:creatureData[creatureIndex]})
})

//post a new creature!
router.post('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // push into array
    creatureData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    //send user back to index get route
    res.redirect('/prehistoric_creatures')
})

//get the new creature form
router.get('/edit', (req, res)=>{
    res.render('prehistoric_creatures/edit')
})

//show route for edit creatures
router.get('/edit/:id', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    //grab the id parameter and convert to int..was string
    let creatureIndex = parseInt(req.params.id)
    res.render('prehistoric_creatures/edit')
})

//post a new creature!
router.post('/', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // push into array
    // creatureData.push(req.body)
    console.log(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    // fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    //send user back to index get route
    // res.redirect('/prehistoric_creatures')
})

module.exports = router
