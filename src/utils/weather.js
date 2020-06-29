const request = require('postman-request');

const forecast = ((lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=620b7e258842caa970a8e45cc54f54e5&query=' + lat + "," + long + '&units=m';
    request(url, { json: true }, (error, response, body) => {
        if (error) {
            callback('unable to connect to weather stack!!', undefined)
        }
        else if (body.error) {
            callback('caonnt find the location, please try again', undefined);
        }
        else {
            const {current}=body;
            //console.log(body);
            const data = {
                temp: current.temperature,
                feelslike: current.feelslike,
                observation_time:current.observation_time
            }
            forecasteData="temperature :"+ data.temp+" degrees but feels like :" +data.feelslike+" degrees. data gathered around:"+data.observation_time;
            callback(undefined, forecasteData);
        }
    })
})


module.exports = forecast
