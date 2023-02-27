const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Lucas Mendonck'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Lucas Mendonck'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Lucas Mendonck',
    helpText: 'Help yourself to some help!'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide a search term'
    })
  }
  geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
    if (error) {
      return res.send({error})
    } 
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        location: location,
        temperature: forecastData.temperature,
        rain: forecastData.precip
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  res.send({
    products: []
  })  
})

app.get('/help/*', (req,res) => {
  res.render('404', {
    title: '404',
    name: 'Lucas Mendonck',
    errorText: 'Help article not found!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Lucas Mendonck',
    errorText: 'Page not found!'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})


