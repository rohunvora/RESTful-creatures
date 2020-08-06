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

// get the update form
router.get('/edit/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    let dinoData = JSON.parse(dinosaurs);
    res.render('dinosaurs/edit', {dino: dinoData[req.params.id], dinoId: req.params.id})
})

router.put('/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs);

    dinosaurs[req.params.id].name = req.body.name;
    dinosaurs[req.params.id].type = req.body.type;

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
    res.redirect('/dinosaurs');
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
});

router.delete('/:id', (req, res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json');
    dinosaurs = JSON.parse(dinosaurs);

    // delete the dinosaur from the dinosaurs json file
    // use splice() method to delete it from the array tha's saved in the variable dinosaurs
    dinosaurs.splice(req.params.id, 1)

    //save the dinosaurs back into the JSON file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
    res.redirect('/dinosaurs');
})

module.exports = router;
// (at the bottom, so routes can be included elsewhere)
