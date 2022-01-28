import context from './context'
const { validateToken, validateData } = require('crowdaids-logic/helpers/validators')

/**
 * Updating the user data in the application.
 * 
 * @param {string} token The token to authenticate the retrieve user.
 * @param {Object} user All data of user to be changed.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function updateUserData(token, user) {
    validateToken(token)
    validateData(user)

    return (async () => {
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const { status } = res

        if (status === 204) {
            return
        } else  if (status === 400 || status === 401) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknoun error')
    })()
}

export default updateUserData