import context from './context'
const { validateId } = require('crowdaids-logic/helpers/validators')

/**
 * Function to toggle on favorites a vehicle.
 * 
 * @param {string} token The token to authenticate the user.
 * @param {string} id The id vehicle to bo toggled.
 * @param {function} callback The function to manage the errors.
 */

function toggleFavoriteBeach(token, id, name) {
    validateId(token)
    validateId(id)

    return (async () => {
        const res = await fetch(`${context.API_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const { status } = res

        if (status === 401 || status === 404) {
            const { error } = res.json()

            throw new Error(error)
        } else if (status === 200) {
            const user = await res.json()

            const { favorites = [] } = user

            const index = favorites.indexOf(id)

            if (index < 0)

                favorites.push(id)
            else
                favorites.splice(index, 1)

            await fetch(`${process.env.REACT_APP_API_URL}/users/${name}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(favorites)
            })

            if (status === 401 || status === 404) {
                const { error } = res.json()
    
                throw new Error(error)
            } else if (status === 200) {
                return
            }
        }
    })()
}

/*const xhr = new XMLHttpRequest

    xhr.onload = () => {
        const { status, responseText } = xhr

        if (status === 401 || status === 404) {
            const response = JSON.parse(responseText)

            const message = response.error

            callback(new Error(message))
        } else if (status === 200) {
            const response = responseText

            const user = JSON.parse(response)

            const { favs = [] } = user

            const index = favs.indexOf(id)

            if (index < 0)
                favs.push(id)
            else
                favs.splice(index, 1)

            const xhr2 = new XMLHttpRequest

            xhr2.onload = () => {
                const { status, responseText } = xhr2

                if (status === 400 || status === 401) {
                    const response = JSON.parse(responseText)

                    const message = response.error

                    callback(new Error(message))
                } else if (status === 204) {
                    callback(null)
                }
            }

            xhr2.open('PATCH', `${process.env.REACT_APP_API_URL}/users`)

            xhr2.setRequestHeader('Authorization', `Bearer ${token}`)

            xhr2.setRequestHeader('Content-Type', 'application/json')

            const body = { favs }

            xhr2.send(JSON.stringify(body))
        }
    }

    xhr.open('GET', `${process.env.REACT_APP_API_URL}/users`)

    xhr.setRequestHeader('Authorization', `Bearer ${token}`)

    xhr.send()*/

export default toggleFavoriteBeach