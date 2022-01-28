import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { retrieveFavoritesBeaches, toggleFavoriteBeach } from '../logic'
import logger from '../logger'
import { IconContext } from "react-icons";
import { BiStar } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import AppContext from './AppContext'

function Favorites({ onItem, theme }) {
    logger.info("Favorites -> render")

    const { showSpinner, hideSpinner, showModal } = useContext(AppContext)

    const [beaches, setBeaches] = useState([])

    useEffect(async () => {
        
        const { token } = sessionStorage
        
        try {
            showSpinner()

            const favorites = await retrieveFavoritesBeaches(token)

            hideSpinner()

            setBeaches(favorites)

        } catch ({ message }) {
            hideSpinner()

            showModal('Error', message)
        }

    }, []);

    const toggleFavorite = async (id, name) => {

        try {
            showSpinner()

            await toggleFavoriteBeach(sessionStorage.token, id, name)

            setBeaches(beaches.filter(beach => beach.idBeach !== id))

            hideSpinner()

        } catch ({ message }) {
            hideSpinner()

            showModal('Error', message)
        }
    }


    return beaches && beaches.length ?
        <div className={`${theme} container__results`}>
            <ul className="container__results--ul">
                <h1>Mis favoritos</h1><hr id="hr--busqueda" />
                {
                    beaches.map(({ idBeach, nameBeach, isFav }) => <li key={idBeach} onClick={() => { onItem({name: nameBeach}, idBeach) }}>
                        <div>
                            <IconContext.Provider value={{ color: '#d8a600', size: "1em", style: { verticalAlign: 'middle' } }}>
                                <h2 className="title--search"><span onClick={event => {
                                    event.stopPropagation()

                                    toggleFavorite(idBeach, nameBeach)
                                }}>{isFav ? <BsStarFill /> : <BiStar />}</span>{nameBeach} </h2>
                            </IconContext.Provider>
                        </div>
                    </li>)
                }
            </ul>
        </div>
        :
        <div className="container__results">
            <ul className="container__results--ul">
                <h1>Mis favoritos</h1><hr id="hr--busqueda" />
                <h3>No tienes favoritos aún.</h3>
            </ul>
        </div>
}

export default Favorites