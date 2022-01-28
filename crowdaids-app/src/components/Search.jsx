import React from 'react'
import logger from '../logger'
import { IconContext } from 'react-icons'
import { BsPersonCircle, BsLightbulb, BsLightbulbOff } from 'react-icons/bs'
import { Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import AppContext from './AppContext'
import ModalProfile from './ModalProfile'
import cablack from '../assets/cablack.png'

function Search({ onSearch, goToProfile, user, theme, toggleLamp }) {
    logger.info('Search -> render')

    const { goToHome } = useContext(AppContext)

    const [modalProfile, setModalProfile] = useState(false)

    const navigate = useNavigate()

    const showModalProfile = () => setModalProfile(true)

    const closeModalProfile = () => setModalProfile(false)

    const goToFavorites = () => navigate('/favs')

    return <>
        <IconContext.Provider value={{ color: 'black', size: '1.2em', style: { verticalAlign: 'middle' }, className: "iconP" }}>
            <form className='container container--search' onSubmit={event => {
                event.preventDefault()
                const query = event.target.query.value

                onSearch(query)
                event.target.reset()
            }}>
                <button id='logoNav' onClick={() => goToHome()}><img src={cablack} style={{ width: '35px' }} /></button>
                <span>
                    <input id='input--search' type='text' placeholder='Busca una playa' name='query' />
                    <button className='button button--search'>Buscar</button>
                    {/*<span id='lamps' onClick={() => toggleLamp()}>{(theme == 'light') ? <BsLightbulb /> : <BsLightbulbOff />}</span>*/}
                </span>
                <span className='container--name'> Bienvenido, {user} <BsPersonCircle onMouseOver={showModalProfile} /></span>
            </form>

            {modalProfile && <ModalProfile
                closeProfile={closeModalProfile}
                goToFavorites={goToFavorites}
                goToProfile={goToProfile} />}
            <Outlet />
        </IconContext.Provider>
    </>
}

export default Search