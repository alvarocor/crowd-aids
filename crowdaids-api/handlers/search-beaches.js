const { searchBeaches } = require('crowdaids-logic')
const handleError = require('./helpers/handle-error')

module.exports = async (req, res) => {
    const { query: { q } } = req

        try {
            const beaches = await searchBeaches(q)

            res.json(beaches)
        } catch (error) {
            handleError(error, res)
        }
}