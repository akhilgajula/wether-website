const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))  // customize server to serve the given folder

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather appp',
        name: 'Akhil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akhil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Akhil',
        helpText: 'How can i help u?'
    })
})
// no use because index.html is the root of server
// app.get('', (req, res) => {  // user request will be done here according to the route
//     // res.send('Hello express')
//     res.send('<h1>Hello express!</h1>')  //sending html
// })

// app.get('/help', (req,res) => {
//     // res.send('Help page')
//     res.send({   // sending object as json response 
//         name: 'Akhil',
//         age: 24
//     })
// })

// app.get('/about', (req,res) => {
//     // res.send('About page')
//     res.send('<h1>About page</h1>')
// })

// app.get('/weather', (req, res) => {
//     // res.send('View Weather')
//     res.send({
//         forecast: 'Cloudy',
//         location: 'Podili'
//     })
// })

// after challenge to integrate weather-app
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be needed'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return  res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({error})
            }
            res.send({
                //    location: location,
                   location,
                   Forecast: forecastData,
                   address: req.query.address

            })
          })
    })

    // res.send({
    //     forecast: 'Cloudy',
    //     location: 'Podili',
    //     address: req.query.address
    // })
})

//app.com   'route'
//app.com/help
//app.com/about
//app.com/weather

// practice on query strings
// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//        return  res.send({
//             error: "You must provide a serach term"
//         })
//     }

//     console.log(req.query)
//     console.log(req.query.search)

//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (rq, res) => {
    // res.send('Help article not found')
    res.render('error', {
        title: '404',
        name: 'akhil',
        error: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('error', {
        title: '404',
        name: 'akhi',
        error: 'Page not found'
    })
})

app.listen(3000, () => {    // run server on port 3000
    console.log('Server is running on port 3000.')
})