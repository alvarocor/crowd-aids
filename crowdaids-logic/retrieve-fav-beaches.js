const { validateId } = require('./helpers/validators');
const { models: { User } } = require('crowdaids-data');
const { NotFoundError } = require("crowdaids-errors");

function retrieveFavBeaches(userId) {
    validateId(userId)

    return(async () => {
        const user = await User.findById(userId)

        if (!user) throw new NotFoundError(`user with id ${userId} not found`)

        const favorites = user.favorites

        return favorites
    })()
}

module.exports = retrieveFavBeaches