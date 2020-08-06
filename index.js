const express = require('express')
const app = express()
const methodOverride = require('method-override');
const ejsLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(ejsLayouts); // tell express to let us use a layout template
app.use(express.urlencoded({extended: false}))//body-parser middleware

//configuring method override
app.use(methodOverride('_method'));

//home route
app.get('/', (req, res)=>{
    res.render('home')
})

app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))
app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.listen(8000)
