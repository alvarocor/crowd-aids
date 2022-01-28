const windNow = (array = [], time) => {
    let wind
    let windText
    let direction
    let response = []

    let info = array[0]

    for (let i = 0; i < array.length; i++) {
        if (array[i].timestamp == time) {
            wind = array[i].speed.toString()
            wind = wind.slice(0, 3)
            response.push(wind)
            windText = array[i].directionType
            response.push(windText)
            direction = array[i].direction.toString()
            direction = direction.slice(0, 6)

            return <><span>{wind} kph - {windText}</span><br /><span className="color--wind">{direction}°</span></>
        }
    }

    if (info) {
        wind = info.speed.toString()
        wind = wind.slice(0, 3)
        response.push(wind)
        windText = info.directionType
        response.push(windText)
        direction = info.direction.toString()
        direction = direction.slice(0, 6)

        return <><span>{wind} kph - {windText}</span><br /><span className="color--wind">{direction}°</span></>
    }
}

export default windNow