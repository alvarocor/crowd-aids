const { authenticateUser } = require('crowdaids-logic')
const jwt = require('jsonwebtoken')
const handleError = require('./helpers/handle-error')
const { env: { SECRET } } = process

module.exports = async (req, res) => {
    const { body: { username, password } } = req

    try {
        const id = await authenticateUser(username, password)

        const token = jwt.sign({ sub: id, exp: Math.floor(Date.now() / 1000) + 3600 }, SECRET)

        res.json({ token })

    } catch (error) {
        handleError(error, res)
    }
}