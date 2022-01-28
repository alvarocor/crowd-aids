import context from './context'
const { validateToken } = require('crowdaids-logic/helpers/validators')

function retrieveFavoritesBeaches(token) {
    validateToken(token)

    return (async () => {
        const res = await fetch(`${context.API_URL}/users/favorites`, {
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
            const favorites = await res.json()

            favorites.forEach(favorite => favorite.isFav = true)

            return favorites
        }
    })()
}

export default retrieveFavoritesBeaches