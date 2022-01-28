const { validateName, validateUsername, validatePassword, validateEmail } = require('./helpers/validators')
const { ConflictError } = require('crowdaids-errors')
const { models: { User } } = require('crowdaids-data')
const bcrypt = require('bcryptjs')

/**
 * Signs up a user in the application.
 * 
 * @param {String} name The name of the user to be registered.
 * @param {String} username The username to be registered.
 * @param {String} password The password to be registered.
 * @param {String} email The email to be registered.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function registerUser(name, username, email, password) {
    validateName(name)
    validateUsername(username)
    validateEmail(email)
    validatePassword(password)

    return (async () => {
        try {
            await User.create({ name, username, email, password: bcrypt.hashSync(password) })
        } catch (error) {
            if (error.code === 11000)
                throw new ConflictError(`user with username ${username} already exists`)

            throw error
        }
    })()
}

module.exports = registerUser