const { validateId, validateName } = require('./helpers/validators');
const { models: { User } } = require('crowdaids-data');
const { NotFoundError } = require("crowdaids-errors");

function toggleFavBeach(idUser, idBeach, name) {
    validateId(idUser)
    validateId(idBeach)
    validateName(name)

    return (async () => {
        const user = await User.findById(idUser)

        if (!user) throw new NotFoundError(`user with id ${idUser} not found`)

        const fav = user.favorites.filter(beach => beach.idBeach === idBeach)

        if (!fav.length) {

            const obj = {
                idBeach: idBeach,
                nameBeach: name
            }
            user.favorites.push(obj)
        }

        else {
            const fav1 = user.favorites.filter(beach => beach.idBeach !== idBeach)

            user.favorites = fav1
        }
        return user.save()

    })()
}

module.exports = toggleFavBeach