const fetch = require('node-fetch')

function searchBeaches(query) {
    if (typeof query !== "string") throw new TypeError(`query is not a string.`)

    return (async () => {
        const res = await fetch(`https://services.surfline.com/search/site?q=${query}`, {
            method: 'GET'
        })

        const { status } = res

        if (status === 200) {

            return await res.json()

        } else throw new Error('unknown error')
    })()
}

module.exports = searchBeaches