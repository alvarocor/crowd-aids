const { models: { User } } = require('crowdaids-data')
const { validateId, validatePassword } = require('./helpers/validators')
const { CredentialsError, NotFoundError } = require('crowdaids-errors')
const bcrypt = require('bcryptjs')

/**
 * Unregistering a user in the application.
 * 
 * @param {string} token The token to authenticate the retrieve user.
 * @param {Object} user The password of the user to be unregistered.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function unregisterUser(id, password) {
    validateId(id)
    validatePassword(password)

    return (async () => {
        const user = await User.findById(id)

        if(!user) throw new NotFoundError(`user with id ${id} not found`)

        if (!bcrypt.compareSync(password, user.password)) throw new CredentialsError('Wrong password')
       
        else if (bcrypt.compareSync(password, user.password)) {
            await user.remove()

            return ('User deleted successfully')
        }
    })()
}

module.exports = unregisterUser