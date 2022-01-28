import context from './context'
const { validateToken, validatePassword } = require('crowdaids-logic/helpers/validators')

/**
 * Unregistering a user in the application.
 * 
 * @param {string} token The token to authenticate the retrieve user.
 * @param {Object} user The password of the user to be unregistered.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function unregisterUser(token, user) {
    validateToken(token)
    validatePassword(user.password)

    return (async () => {
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const { status } = res

        if (status === 204) {
            return
        } else if (status === 400 || status === 401) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknoun error')
    })()
}

export default unregisterUser