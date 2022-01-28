import context from './context'
const { validateToken } = require('crowdaids-logic/helpers/validators')

/**
 * Authenticate a user in the application.
 *
 * @param {string} token The token to authenticate the retrieve user.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function retrieveUser(token) {
    validateToken(token)

    return (async () => {
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = res

        if (status === 200) {
            
            return await res.json()

        } else if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else throw new Error('unknow error')
    })()
}

export default retrieveUser