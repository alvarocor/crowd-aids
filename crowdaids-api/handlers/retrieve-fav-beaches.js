const { retrieveFavBeaches } = require('crowdaids-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { headers: { authorization } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        const favs = await retrieveFavBeaches(id)
        
        res.json(favs)
    } catch (error) {
        handleError(error, res)
    }
}

