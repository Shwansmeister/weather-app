const request = require ('postman-request')
  
const forecast = (latitude, longitude, callback) => {
  const url =  'http://api.weatherstack.com/current?access_key=fa12148f3cc70e94a5c442246381ac0f&query=' + latitude + ',' + longitude
  request ({url, json: true}, (error, {body}) => {
  const {weather_descriptions:weather, temperature, feelslike:feelsLike, humidity, precip:rain} = body.current
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, {
        weather: weather[0],
        temperature: "It is currently " + temperature + " degrees out. It feels like " + feelsLike + " degrees.",
        precip: "There is a " + rain + "% chance of rain, and the humidity is " + humidity + "%.",
      })
    }
  })
}

module.exports = forecast
