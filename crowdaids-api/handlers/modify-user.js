const { modifyUser } = require('crowdaids-logic')
const { handleError, validateAuthorizationAndExtractPayload } = require('./helpers')

module.exports = async (req, res) => {
    const { headers: { authorization }, body } = req
    
    try {
        const { sub: id } = validateAuthorizationAndExtractPayload(authorization)

        await modifyUser(id, body)

        res.status(204).send()
    } catch (error) {
        handleError(error, res)
    }
}