require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3009

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose');
const addRoutes = require('./routes/addRoutes')
const singleRoutes = require('./routes/singleRoutes')
const GalleryItem = require('./models/galleryItem')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('connected DB')
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    GalleryItem.find()
    .then(result => {
        res.render('index', {galleryData: result})
    })
    .catch(err => console.log(err) )
})

app.use('/add', addRoutes)
app.use('/single', singleRoutes)
