const tideNow = (array=[], time) => {
    let tide

    let info = array[0]

    for (let i = 0; i < array.length; i++) {
        if (array[i].timestamp == time) {
            tide = array[i].height.toString()
            tide = tide.slice(0, 3)

            return tide
        } 
    }

    if (info) {
        tide = info.height.toString()
        tide = tide.slice(0, 3)

        return tide
    }
}

export default tideNow