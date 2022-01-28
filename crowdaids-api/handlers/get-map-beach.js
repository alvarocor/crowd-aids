const { getMapBeach } = require('crowdaids-logic')
const handleError = require('./helpers/handle-error')

module.exports = async (req, res) => {
    const { params: { lon, lat} } = req

    try {
        const mapBeach = await getMapBeach(lon, lat)
        
        res.json(mapBeach)
    } catch (error) {
        handleError(error, res)
    }
}