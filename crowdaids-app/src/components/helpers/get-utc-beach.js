const getUtcBeach = (utc = '') => {
    let time = new Date()
    time = time.toString()
    let year = time.slice(13, 15)
    let month = time.slice(4, 7)
    let day = time.slice(8, 10)
    let hour = time.slice(16, 18)
    let utcUser = time.slice(29, 31)
    let dateText

    switch (month) {
        case 'Jan':
            month = '00'
            break
        case 'Feb':
            month = '01'
            break
        case 'Mar':
            month = '02'
            break
        case 'Apr':
            month = '03'
            break
        case 'May':
            month = '04'
            break
        case 'Jun':
            month = '05'
            break
        case 'Jul':
            month = '06'
            break
        case 'Aug':
            month = '07'
            break
        case 'Sep':
            month = '08'
            break
        case 'Oct':
            month = '09'
            break
        case 'Nov':
            month = '10'
            break
        case 'Dec':
            month = '11'
            break
        default:
            month = '00'
    }

    hour = parseInt(hour)
    utcUser = parseInt(utcUser)

    let utcApiBeach = utcUser + (utc - (utcUser))
    let realUtcBeach = utcApiBeach - (utcUser)

    if (realUtcBeach < 0) {
        dateText = new Date(Date.UTC('20' + year, month, day, hour + realUtcBeach, 0, 0))
    } else if (realUtcBeach >= 0) {
        dateText = new Date(Date.UTC('20' + year, month, day, hour - realUtcBeach, 0, 0))
    }

    let dateText1 = dateText.toString()
    dateText1 = Date.parse(dateText) / 1000

    return dateText1
}

export default getUtcBeach