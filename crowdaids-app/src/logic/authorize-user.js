import context from './context'
const { validateUsername, validatePassword } = require('crowdaids-logic/helpers/validators')

/**
 * Login a user in the application.
 * 
 * @param {Object} user The user with the username and password to sign in.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function authorizeUser(user) {
    validateUsername(user.username)
    validatePassword(user.password)

    return (async () => {
        const res = await fetch(`${context.API_URL}/users/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const { status } = res

        if (status === 200) {
            const { token } = await res.json()

            return token
        } else if (status === 401) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknown error')
    })()
}

export default authorizeUser