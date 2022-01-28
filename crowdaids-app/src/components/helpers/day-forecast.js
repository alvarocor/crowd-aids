const dayForecast = (arraySwell = [], arrayWind = [], arrayWeather = [], time = null) => {
    let time1 = time + 75600
    let time2 = time
    let swellMax, swellMin, primarySwellDir, primarySwellPer, secondarySwellDir, secondarySwellPer, wind, windText, weather, iconWeather, hour, date, hourR, dayName, dayNumber
    let response = []
    let obj = {}

    while (time2 <= time1) {
        date = time2 * 1000
        date = new Date(date)
        date = date.toString()
        dayName = date.slice(0, 3)
        dayNumber = date.slice(8, 10)
        hour = date.slice(16, 18)

        switch (dayName) {
        case 'Mon':
            dayName = 'Lunes'
            break
        case 'Tue':
            dayName = 'Martes'
            break
        case 'Wed':
            dayName = 'Miércoles'
            break
        case 'Thu':
            dayName = 'Jueves'
            break
        case 'Fri':
            dayName = 'Viernes'
            break
        case 'Sat':
            dayName = 'Sábado'
            break
        case 'Sun':
            dayName = 'Domingo'
            break
        default:
            dayName = '00'
    }

        for (let i = 0; i < arraySwell.length; i++) {
            if (arraySwell[i].timestamp === time2) {
                swellMax = arraySwell[i].surf.max.toString()
                swellMin = arraySwell[i].surf.min.toString()
                swellMax = swellMax.slice(0, 3)
                swellMin = swellMin.slice(0, 3)

                primarySwellDir = arraySwell[i].swells[0].direction.toString()
                primarySwellPer = arraySwell[i].swells[0].period
                secondarySwellDir = arraySwell[i].swells[1].direction.toString()
                secondarySwellPer = arraySwell[i].swells[1].period
                
                primarySwellDir = primarySwellDir.slice(0, 6)
                secondarySwellDir = secondarySwellDir.slice(0, 6)
            }
        }
        for (let a = 0; a < arrayWind.length; a++) {
            if (arrayWind[a].timestamp === time2) {
                wind = arrayWind[a].speed.toString()
                wind = wind.slice(0, 3)

                windText = arrayWind[a].directionType
            }
        }
        for (let j = 0; j < arrayWeather.length; j++) {
            if (arrayWeather[j].timestamp === time2) {
                weather = arrayWeather[j].temperature.toString()
                weather = weather.slice(0, 2)
                iconWeather = arrayWeather[j].condition
            }
        }

        obj = {
            hour: hour,
            dayName: dayName,
            dayNumber: dayNumber,
            sMax: swellMax,
            sMin: swellMin,
            primarySwellDirection: primarySwellDir,
            primarySwellPeriod: primarySwellPer,
            secondarySwellDirection: secondarySwellDir,
            secondarySwellPeriod: secondarySwellPer,
            wind: wind,
            windT: windText,
            weather: weather,
            iconW: iconWeather
        }
        response.push(obj)
        time2 += 10800
    }

    return response
}

export default dayForecast