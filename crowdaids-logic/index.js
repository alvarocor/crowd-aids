const registerUser = require('./register-user')
const retrieveUser = require('./retrieve-user')
const modifyUser = require('./modify-user')
const unregisterUser = require('./unregister-user')
const authenticateUser = require('./authenticate-user')
const searchBeaches = require('./search-beaches')
const retrieveSwellConditions = require('./retrieve-swell-conditions')
const retrieveSwellConditionsText = require('./retrieve-swell-conditions-text')
const retrieveWeatherConditions = require('./retrieve-weather-conditions')
const retrieveWindConditions = require('./retrieve-wind-conditions')
const retrieveTides = require('./retrieve-tides')
const toggleFavBeach = require('./toggle-fav-beach')
const retrieveFavBeaches = require('./retrieve-fav-beaches')

module.exports = {
    registerUser,
    retrieveUser,
    modifyUser,
    unregisterUser,
    authenticateUser,
    searchBeaches,
    retrieveSwellConditions,
    retrieveSwellConditionsText,
    retrieveWeatherConditions,
    retrieveWindConditions,
    retrieveTides,
    toggleFavBeach,
    retrieveFavBeaches
}