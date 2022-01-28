const arroWind = (array, time) => {
    if (!array)
        return 0

    let info = array[0]

    for (let i = 0; i < array.length; i++) {
        if (array[i].timestamp === time) {
            info = array[i]

            break
        }
    }
    return info? info.direction : 0
}

export default arroWind