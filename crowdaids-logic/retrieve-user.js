const { validateId } = require('./helpers/validators')
const { NotFoundError } = require('crowdaids-errors')
const { models: { User } } = require('crowdaids-data')

/**
 * Authenticate a user in the application.
 *
 * @param {string} id The id to authenticate the retrieve user.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function retrieveUser(id) {
    validateId(id)

    return (async () => {
        const user = await User.findById(id).lean()

        if (!user) throw new NotFoundError('Wrong ID')

        user.id = user._id.toString()

        delete user._id

        delete user.id

        delete user.password

        delete user.__v

        return user
    })()
}

module.exports = retrieveUser