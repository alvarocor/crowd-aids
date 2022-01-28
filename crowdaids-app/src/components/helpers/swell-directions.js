const swellDirections = (array = [], time) => {
    let direction
    let directionMin
    let response = []

    let info = array[0]

    for (let i = 0; i < array.length; i++) {
        if (array[i].timestamp === time) {
            direction = array[i].swells[0].direction.toString()
            directionMin = array[i].swells[0].directionMin.toString()

            direction = direction.slice(0, 6)
            response.push(direction)
            directionMin = directionMin.slice(0, 6)
            response.push(direction)

            return (<><span className="color--swell">Primario: {direction}°</span><br /><span>Secundario: {directionMin}°</span></>)
        }
    }

    if(info) {
        direction = info.swells[0].direction.toString()
        directionMin = info.swells[0].directionMin.toString()
    
        direction = direction.slice(0, 6)
        response.push(direction)
        directionMin = directionMin.slice(0, 6)
        response.push(direction)
    
        return (<><span className="color--swell">Primario: {direction}°</span><br /><span>Secundario: {directionMin}°</span></>)

    }

}

export default swellDirections