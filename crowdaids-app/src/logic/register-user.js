import context from './context'
const { validateName, validateUsername, validateEmail, validatePassword } = require('crowdaids-logic/helpers/validators')

/**
 * Signs up a user in the application.
 * 
 * @param {Object} name All data of the user to be registered.
 * @param {function} callback The callback function to manage the response.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function registerUser(user) {
    validateName(user.name)
    validateEmail(user.email)
    validateUsername(user.username)
    validatePassword(user.password)

    return (async () => {
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const { status } = res

        if (status === 201)
            return
        else if (status === 409 || status === 400) {
            const { error } = await res.json()

            throw new Error(error)
        } else throw new Error('unknoun error')
    })()
}

export default registerUser