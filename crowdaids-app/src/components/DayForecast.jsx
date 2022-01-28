import React from 'react'
import ScrollReveal from 'scrollreveal'

const DayForecast = ({ day, theme }) => {
    //ScrollReveal().reveal('.list--day', { delay: 100 });
    return <>
        <div className={`${theme}list--day`}>
            {
                <span><h3>{day[0].dayName}  {day[0].dayNumber}</h3></span>
            }
            <div className='titles--for'>
                <h3>Hora</h3><h3>Surf</h3><h3>Oleaje primario</h3><h3>Oleaje secundario</h3><h3>Viento</h3><h3>Clima</h3>
            </div>
            {
                day.map(({
                    hour, sMax, sMin, iconW, weather, wind, windT, primarySwellDirection, primarySwellPeriod, secondarySwellDirection, secondarySwellPeriod
                }) =>
                    <div className='list--data' key={hour * (Math.random() * Math.random())}>
                        <span>{hour}</span>
                        <span>{sMin} - {sMax} m</span>
                        <span>{primarySwellDirection}° - Period: {primarySwellPeriod}</span>
                        <span>{secondarySwellDirection}° - Period: {secondarySwellPeriod}</span>
                        <span>{wind}kph {windT}</span>
                        <span>{weather}C° - <img src={`https://wa.cdn-surfline.com/quiver/0.19.6/weathericons/${iconW}.svg`} style={{width: '20px'}}/></span>
                    </div>
                )
            }
        </div>
    </>
}

export default DayForecast