const request = require('request')

const forecast = (lat, long, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=7b64fb5442bdb9f02f796f34d61530b3&query=' + lat + ',' + long // + '&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Weather service', undefined)
        } else if (body.error) {
            callback('Unable to find the weather for the given coordinates', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }

    })
}

module.exports = forecast