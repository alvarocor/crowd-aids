import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { retrieveBeach, toggleFavoriteBeach } from '../logic'
import {
    toxy,
    heigthMaxMin,
    tideNow,
    windNow,
    weatherNow,
    getUtcBeach,
    arrowSwell,
    arroWind,
    swellDirections,
    dayForecast
}
    from './helpers'
import './Home.sass'
import AppContext from './AppContext'
import InformationNow from './InformationNow'
import WeekForecast from './WeekForecast'

import logger from '../logger'


function Detail({ beach, theme }) {

    logger.info('Detail -> render')

    const { showSpinner, hideSpinner, showModal } = useContext(AppContext)
    const { breadCrumbs } = beach

    const [beachInfo, setBeachInfo] = useState([])
    const [fav, setFav] = useState([])
    const { id, name } = useParams()

    useEffect(async () => {

        const { token } = sessionStorage

        if (token) {
            try {

                showSpinner()

                const beachInformation = await retrieveBeach(token, id, name)

                setBeachInfo(beachInformation)

                setFav(beachInformation[0])

                hideSpinner()

            } catch ({ message }) {

                hideSpinner()
                showModal('Error', message)
            }
        }
    }, [id])

    const utcActual = getUtcBeach(beachInfo[0]?.data?.wave[0]?.utcOffset)

    const maxMin = () => heigthMaxMin(beachInfo[0]?.data?.wave, utcActual)

    const tide = () => tideNow(beachInfo[3]?.data?.tides, utcActual)

    const wind = () => windNow(beachInfo[4]?.data?.wind, utcActual)

    const weather = () => weatherNow(beachInfo[2]?.data?.weather, utcActual)

    const swellDir = () => swellDirections(beachInfo[0]?.data?.wave, utcActual)

    const coordMap = () => toxy(beachInfo[0]?.associated?.location?.lon, beachInfo[0]?.associated?.location?.lat)

    const arrS = () => arrowSwell(beachInfo[0]?.data?.wave, utcActual)

    const arrW = () => arroWind(beachInfo[4]?.data?.wind, utcActual)

    const createDayFor = () => {
        let arr = []
        const time = 24
        for (let i = 0; i < 6; i++) {

            arr.push(
                dayForecast(
                    beachInfo[0]?.data?.wave,
                    beachInfo[4]?.data?.wind,
                    beachInfo[2]?.data?.weather,
                    beachInfo[0]?.data?.wave[time * i]?.timestamp)
            )
        }
        return arr
    }

    const arrDayFor = createDayFor()

    const toggleFavorite = async (id, name) => {

        try {
            showSpinner()

            await toggleFavoriteBeach(sessionStorage.token, id, name)

            hideSpinner()

            setBeachInfo(beachInfo.map(beach => {
                if (beach) {
                    setFav({ ...fav, isFav: !fav.isFav})
                    return { ...beach, isFav: !beach.isFav}
                }


                return beach
            }))


        } catch ({ message }) {
            hideSpinner()

            showModal(message)
        }
    }


    return <>
        <div className={`${theme}`}>
            <div className='results--title'>
                <h3>{breadCrumbs}</h3>
                <h1 className='title__beach'>{beachInfo[0]?.nameBeach}</h1>
            </div>
            <div className='grid'>
                <InformationNow
                    maxMin={maxMin}
                    tide={tide}
                    wind={wind}
                    weather={weather}
                    swellDir={swellDir}
                    coordMap={coordMap}
                    arrS={arrS}
                    arrW={arrW}
                    toggleFavorite={toggleFavorite}
                    beachInfo={beachInfo}
                    fav={fav}
                    id={id}
                    name={name}
                />
                <WeekForecast arrDayFor={arrDayFor} />
            </div>
        </div>
    </>
}

export default Detail