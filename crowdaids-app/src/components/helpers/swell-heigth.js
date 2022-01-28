const heigthMaxMin = (array = [], time) => {
    let swellMax
    let swellMin
    let response = []

    let info = array[0]

    for (let i = 0; i < array.length; i++) {
        if (array[i].timestamp == time) {
            swellMax = array[i].surf.max.toString()
            swellMin = array[i].surf.min.toString()

            swellMax = swellMax.slice(0, 3)
            response.push(swellMax)
            swellMin = swellMin.slice(0, 3)
            response.push(swellMin)

            return <span>{swellMin} - {swellMax} m</span>
        }
    }

    if (info) {
        swellMax = info.surf.max.toString()
        swellMin = info.surf.min.toString()

        swellMax = swellMax.slice(0, 3)
        response.push(swellMax)
        swellMin = swellMin.slice(0, 3)
        response.push(swellMin)

        return <span>{swellMin} - {swellMax} m</span>
    }
}

export default heigthMaxMin