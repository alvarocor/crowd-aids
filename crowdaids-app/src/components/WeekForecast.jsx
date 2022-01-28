import React from 'react'
import DayForecast from './DayForecast'
import './WeekForecast.sass'

function WeekForecast({ arrDayFor, theme }) {
    
    return <>
        <main className={`${theme} grid__center-main center`}>
            <h2 className='title__beach'>Pronóstico próximos 6 días</h2>
            {
                arrDayFor.map(day => <DayForecast day={ day } key={Math.random() * (Math.random() * Math.random())}></DayForecast>)
            }   
        </main>
    </>
}

export default WeekForecast