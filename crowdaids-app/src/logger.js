const logger = {
    info(message) {
        console.log('%cINFO %c' + new Date().toISOString() + ' %c' + message, 'color: blue;', 'color: black;' , 'color: blue;')
    }
}

export default logger