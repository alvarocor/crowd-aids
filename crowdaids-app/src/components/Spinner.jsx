import React from 'react'
import './Spinner.sass'
import logger from '../logger'

function Spinner() {
    logger.info('Spinner -> render')
    return (
        <svg className='spinner container container--vertical' viewBox='0 0 1000 5000' height='100vw' width='100vw'>
        <g id='spinner'>
            <circle className='todos circulo1' cx='300' cy='500' r='100' />
            <circle className='todos circulo2' cx='400' cy='700' r='100' />
            <circle className='todos circulo3' cx='600' cy='600' r='100' />
            <circle className='todos circulo4' cx='500' cy='400' r='100' />
        </g>
    </svg>
    )
}

export default Spinner