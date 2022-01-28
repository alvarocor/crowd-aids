import React from 'react'
import './Home.sass'
import logger from '../logger'
import { useQuery } from '../hooks'
import { useState, useEffect } from 'react'
import { searchBeaches, toggleFavoriteBeach } from '../logic'
import { useContext } from 'react'
import { IconContext } from "react-icons"
import { BiStar } from "react-icons/bi"
import { BsStarFill } from "react-icons/bs"
import AppContext from './AppContext'

function Results({ onItem, theme }) {
    logger.info('Results -> render')

    const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

    const [beaches, setBeaches] = useState({})

    const _query = useQuery()

    const query = _query.getParam('q')

    useEffect(async () => {

        const { token } = sessionStorage

        if (token) {
            try {
                showSpinner()

                const beaches = await searchBeaches(token, query)

                hideSpinner()

                setBeaches(beaches)

            } catch ({ message }) {
                hideSpinner()

                showModal('Error', message)
            }
        }
    }, [query])

    const toggleFavorite = async (id, name) => {

        try {
            showSpinner()

            await toggleFavoriteBeach(sessionStorage.token, id, name)

            hideSpinner()

            setBeaches(beaches.map(beach => {
                if (beach._id === id) {
                    return { ...beach, isFav: !beach.isFav }
                }

                return beach
            }))

        } catch ({ message }) {
            hideSpinner()

            showModal(message)
        }
    }

    return beaches && beaches.length ?
        <div className={`${theme} container__results`}>
            <ul className='container__results--ul'>
                <h1>Resultados de busqueda</h1><hr id='hr--busqueda' />
                {
                    beaches.map(({ _id, _source: { name, breadCrumbs }, isFav }) => <li key={_id} onClick={() => { onItem({ name, breadCrumbs }, _id) }}>
                        <div>
                            <IconContext.Provider value={{ color: '#d8a600', size: '1em', style: { verticalAlign: 'middle' } }}>
                                <h2 className='title--search'><span onClick={event => {
                                    event.stopPropagation()

                                    toggleFavorite(_id, name)
                                }}>{isFav ? <BsStarFill /> : <BiStar />}</span>{name} | <span className='location--name'> {breadCrumbs} </span> </h2>
                            </IconContext.Provider>
                        </div>
                    </li>)
                }
            </ul>
        </div>
        :
        <div className="container__results">
            <ul className="container__results--ul">
                <h2>No se encontraron resúltados.</h2>
            </ul>
        </div>
}

export default Results