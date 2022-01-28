const weatherNow = (array = [], time) => {
    let weather
    let differentIcon
    let response = []

    let info = array[0]

    for (let i = 0; i < array.length; i++) {
        if (array[i].timestamp == time) {
            weather = array[i].temperature.toString()

            weather = weather.slice(0, 2)
            response.push(weather)
            differentIcon = array[i].condition
            response.push(differentIcon)

            return <span><img src={`https://wa.cdn-surfline.com/quiver/0.19.6/weathericons/${differentIcon}.svg`} />{weather} °c</span>
        }
    }

    if (info) {
        weather = info.temperature.toString()

        weather = weather.slice(0, 2)
        response.push(weather)
        differentIcon = info.condition
        response.push(differentIcon)

        return <span><img src={`https://wa.cdn-surfline.com/quiver/0.19.6/weathericons/${differentIcon}.svg`} />{weather} °c</span>
    }
}

export default weatherNow