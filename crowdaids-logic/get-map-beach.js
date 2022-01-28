//const { validateId } = require("./helpers/validators");
const fetch = require('node-fetch');
const { NotFoundError, CredentialsError } = require("crowdaids-errors");

function getMapBeach(lon, lat) {
debugger
    return (async () => {
        const res = await fetch(`https://api.maptiler.com/maps/basic/9/${lon}/${lat}.png?key=7aiwCGhglRXo4QbAr4RI`, {
            method: 'GET'
        })

        const { status } = res

        if (status === 200) {
            
            return await res.json()
        } else if (status === 404) {
            throw new NotFoundError('Wrong coordinates')
        } else if (status === 403) {
            throw new CredentialsError('Wrong Key')
        } else throw new Error('unknoun error')
    })()
}

module.exports = getMapBeach