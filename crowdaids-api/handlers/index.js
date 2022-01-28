module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    modifyUser: require('./modify-user'),
    searchBeaches: require('./search-beaches'),
    unregisterUser: require('./unregister-user'),
    retrieveSwellConditions: require('./retrieve-swell-conditions'),
    retrieveSwellConditionsText: require('./retrieve-swell-conditions-text'),
    retrieveWeatherConditions: require('./retrieve-weather-conditions'),
    retrieveWindConditions: require('./retrieve-wind-conditions'),
    retrieveTides: require('./retrieve-tides'),
    toggleFavBeach: require('./toggle-fav-beach'),
    retrieveFavBeaches: require('./retrieve-fav-beaches')
}