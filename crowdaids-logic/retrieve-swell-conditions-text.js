const { validateId } = require("./helpers/validators");
const fetch = require('node-fetch');
const { NotFoundError } = require("crowdaids-errors");

function retrieveSwellConditionsText(id) {
    validateId(id)

    return (async () => {
        const res = await fetch(`http://services.surfline.com/kbyg/spots/forecasts/conditions?spotId=${id}`, {
            method: 'GET'
        })

        const { status } = res

        if (status === 200) {

            return await res.json()
        } else if (status === 400) {
            throw new NotFoundError('Wrong ID')
        } else throw new Error('unknoun error')
    })()
}

module.exports = retrieveSwellConditionsText