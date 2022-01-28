const { validateUsername, validatePassword } = require('./helpers/validators')
const { CredentialsError } = require('crowdaids-errors')
const { models: { User } } = require('crowdaids-data')
const bcrypt = require('bcryptjs')

/**
 * Login a user in the application.
 * 
 * @param {string} username The username to sign in.
 * @param {string} password The password to sign in.
 * 
 * @throws {TypeError} When any of the arguments does not match the correct type.
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function authenticateUser(username, password) {
    validateUsername(username)
    validatePassword(password)

    return (async () => {
        const user = await User.findOne({ username })
    
        if (!user || !bcrypt.compareSync(password, user.password)) throw new CredentialsError('Wrong credentials')

        return user.id
    })()
}

module.exports = authenticateUser

/*users.findOne({ username, password }, (error, user) => {
        if (error) return callback(error)

        if (!user) return callback(new CredentialsError('Wrong credentials'))

        callback(null, user._id.toString())
    })*/