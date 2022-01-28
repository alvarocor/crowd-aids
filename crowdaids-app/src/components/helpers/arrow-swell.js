const arrowSwell = (array, time) => {
    if (!array)
        return 0

    let info = array[0]

    for (let i = 0; i < array.length; i++)
        if (array[i].timestamp === time) {
            info = array[i]
            
            break
        }
        
    return info.swells? info.swells[0].direction : 0
}

export default arrowSwell