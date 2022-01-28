import context from './context'
const { validateToken, validateId } = require('crowdaids-logic/helpers/validators')

/**
 * Getting all information of the id vehicle
 * 
 * @param {string} id The id to get all the information of the vehicle
 * @param {function} callback The callback to manage the response
 * 
 * @throws {Error} When any of the arguments does not contain the correct format.
 */

function retrieveBeach(token, id, name, breadCrumbs) {
    validateToken(token)
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

            const { favorites } = user

            const res2 = await fetch(`http://localhost:8000/api/forecast/swell?spotId=${id}&days=6&intervalHours=1`, {
                method: 'GET'
            })

            const { status } = res2

            if (status === 200) {
                const swellCondition = await res2.json()
                
                const dataBeach = []

                if (!swellCondition) throw new Error(`No swell conditions found with id ${id}`)

                swellCondition.id = id

                swellCondition.nameBeach = name

                swellCondition.isFav = favorites.some(fav => fav.idBeach === swellCondition.id)

                dataBeach.push(swellCondition)

                const res3 = await fetch(`http://localhost:8000/api/forecast/swelltext?spotId=${id}`, {
                    method: 'GET'
                })

                const { status } = res3

                if (status === 200) {
                    const swellConditionText = await res3.json()

                    if (!swellConditionText) throw new Error(`No swell conditions found with id ${id}`)

                    dataBeach.push(swellConditionText)

                    const res4 = await fetch(`http://localhost:8000/api/forecast/weather?spotId=${id}&days=6&intervalHours=1`, {
                        method: 'GET'
                    })

                    const { status } = res4

                    if (status === 200) {
                        const weatherCondition = await res4.json()

                        if (!weatherCondition) throw new Error(`No weather found with id ${id}`)

                        dataBeach.push(weatherCondition)

                        const res5 = await fetch(`http://localhost:8000/api/forecast/tides?spotId=${id}&days=6`, {
                            method: 'GET'
                        })

                        const { status } = res5

                        if (status === 200) {
                            const tides = await res5.json()

                            if (!tides) throw new Error(`No tides found with id ${id}`)

                            dataBeach.push(tides)

                            const res6 = await fetch(`http://localhost:8000/api/forecast/wind?spotId=${id}&days=6&intervalHours=1`, {
                                method: 'GET'
                            })

                            const { status } = res6

                            if (status === 200) {
                                const windConditions = await res6.json()

                                if (!windConditions) throw new Error(`No wind conditions found with id ${id}`)

                                dataBeach.push(windConditions)

                                return dataBeach
                            }
                        }
                    }
                }
            }
        } else throw new Error('unknow error')
    })()
}

export default retrieveBeach