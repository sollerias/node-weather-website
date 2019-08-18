const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// Begin 1: For customizing views folder (change views folder name)
const viewsPath = path.join(__dirname, '../templates/views')
// End 1: For customizing views folder (change views folder name)
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup hahdlebars engine and views location
app.set('view engine', 'hbs')
// Begin 2: For customizing views folder (change views folder name)
app.set('views', viewsPath)
// End 2: For customizing views folder (change views folder name)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "Gleb Tregubov"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Gleb Tregubov'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'How we can help you?',
        name: "Gleb Tregubov"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    let address = req.query.address
    geocode (address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send ({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     let  = req.query.search
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        message: 'Help article not found!',
        name: 'Gleb Tregubov'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        message: 'Page not found!',
        name: 'Gleb Tregubov'
    })
})

app.listen(3001, () => {
    console.log('Server is up on port 3001.')
})