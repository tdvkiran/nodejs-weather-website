const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/weather');

const app = express();

const port = process.env.PORT || 3000;

// define paths for express configs
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");



// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup the static directory to serve
app.use(express.static(publicDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kiran'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Kiran'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpMsg: "Do you need help?",
        name: 'Kiran'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be prvoided!!"
        })
    }

    //console.log(req.query);

    // res.send({
    //     location: req.query.address,
    //     temp: "35",
    //     feelslike: "40"
    // });

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        else {
            forecast(latitude, longitude, (error, forecasteData) => {
                if (error) {
                    return res.send({
                        error
                    });
                }
                else {
                    return res.send({
                        forecast: forecasteData,
                        location,
                        address: req.query.address
                    })
                }
            })
        }

    })

});



app.get("/help/*", (req, res) => {
    res.render('404', {
        error: "Help article Not found",
        title: "Error 404",
        name: "Kiran"
    });
})
app.get("*", (req, res) => {
    res.render('404', {
        error: "Page Not found",
        title: "Error 404",
        name: "Kiran"
    });
})

app.listen(port, () => {
    console.log('server is running on port ' + port);
})