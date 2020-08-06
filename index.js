const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs') // used to read json files

app.set('view engine', 'ejs')
app.use(ejsLayouts);

//home route
app.get('/', (req, res)=>{
    res.render('home')
})

//index route
app.get('/dinosaurs', (req, res)=>{
    // get data from dinosaurs.json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    res.render('dinosaurs/index', {myDinos: dinoData})
})

app.listen(8000)