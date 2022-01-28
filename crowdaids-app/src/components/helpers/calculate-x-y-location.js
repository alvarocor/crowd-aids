function toxy(lon, lat) {
    let arrayXY = []
    var vlong = lon
    var vlat = lat
    
    function long2tile(lon1, zoom) {
        let tt = Number(lon1);
        return (Math.floor((tt + 180) / 360 * Math.pow(2, zoom)));
    }
    
    function lat2tile(lat1, zoom) {
        return (Math.floor((1 - Math.log(Math.tan(lat1 * Math.PI / 180) + 1 / Math.cos(lat1 * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
    }
    
    const x = long2tile(vlong, 9)
    arrayXY.push(x)
    const y = lat2tile(vlat, 9)
    arrayXY.push(y)

    let string = x + '/' + y

    return string
}

export default toxy




