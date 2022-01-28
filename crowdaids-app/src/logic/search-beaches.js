import context from './context'
const { validateToken } = require('crowdaids-logic/helpers/validators')

/**
 * Searching vehicles by query
 * 
 * @param {string} query The query to be searching on the API
 * @param {function} callback The callback to manage the response
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function searchBeaches(token, query) {
    validateToken(token)
    
    if (typeof query !== "string") throw new TypeError(`query is not a string.`)
    if (typeof query !== "string") throw new TypeError(`${query} is not a string`)
    if (!query.trim().length) throw new Error("Query is empty or blank")

    return (async () => {
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status === 200) {
            const user = await res.json()

            const { favorites } = user

            const res2 = await fetch(`http://localhost:8000/api/forecast/site?q=${query}`, {
                method: 'GET'
            })

            const { status } = res2

            if (status === 200) {
                const beaches = await res2.json()

                const arrayBeaches = beaches[0].hits.hits

                arrayBeaches.forEach(beach => {
                    beach.isFav = favorites.some(fav => fav.idBeach === beach._id)
                })

                return arrayBeaches
            }
        } else throw new Error('unknow error')
    })()
}

export default searchBeaches