const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/50448c0f3cb7839b4fd93b622b0887da/' + longitude + ',' + latitude +'?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)            
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 
                'C degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. ' +
                'Wind speed is a ' + body.daily.data[0].windSpeed + ' m/sec. Min temperature is ' + 
                body.daily.data[0].temperatureMin + 'C. And max temperature is ' + body.daily.data[0].temperatureMax + 'C.'
            )
        }
    })
}

module.exports = forecast