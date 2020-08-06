const express = require('express')
const router = express.Router()
const fs = require('fs') // used to read json files

//index route for dinosaurs
router.get('/', (req, res)=>{
    // get data from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    
    if(nameFilter) {
        dinoData = dinoData.filter( dino =>{
            return dino.name.toLowerCase()===nameFilter.toLowerCase()
        })
    }

    // render dino index with dinoData as myDinos
    res.render('dinosaurs/index', {myDinos: dinoData})
})

//get the new dino form
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new')
})

//show route for dino
router.get('/:id', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //grab the id parameter and convert to int..was string
    let dinoIndex = parseInt(req.params.id)
    res.render('dinosaurs/show', {myDino:dinoData[dinoIndex]})
})

//post a new dino!
router.post('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // push into array
    dinoData.push(req.body)
    // convert dinoData back to JSON and write to dinosaurs.json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    //send user back to index get route
    res.redirect('/dinosaurs')
})

module.exports = router