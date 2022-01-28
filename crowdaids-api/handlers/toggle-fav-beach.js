const { toggleFavBeach } = require('crowdaids-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    debugger
    const { headers: { authorization }, params: { beachId, nameBeach } } = req

    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        await toggleFavBeach(id, beachId, nameBeach)
        
        res.status(204).send()
    } catch (error) {
        handleError(error, res)
    }
}