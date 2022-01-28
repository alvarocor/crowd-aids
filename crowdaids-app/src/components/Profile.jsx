import React from 'react'
import logger from '../logger'
import './Profile.sass'
import { useContext, useEffect, useState } from 'react'
import { retrieveUser } from '../logic'
import AppContext from './AppContext'

function Profile({ goToChangeData, goToChangePassword, goToUnregister, goHome, theme }) {
    logger.info("Profile -> render")

    const { showModal, showSpinner, hideSpinner } = useContext(AppContext)

    const [user, setUser] = useState(null)

    useEffect(async () => {
        logger.info('Profile -> useEffect (componentDidMount)')

        const { token } = sessionStorage

        if (token) {
            try {
                showSpinner()

                const user = await retrieveUser(token)

                hideSpinner()

                setUser(user)
            } catch ({ message }) {
                hideSpinner()

                showModal('Error', message)
            }
        }
    }, [])


    return (
        <div className={`${theme} grid__center center`}>
            <aside className="grid__center-aside">
                <div className="aside1--elements">
                    <button className="button button--config" onClick={() => goToChangeData()}>Modificar tu datos</button>
                </div>
                <div className="aside1--elements">
                    <button className="button button--change--password" onClick={() => goToChangePassword()}>Cambiar contraseña</button>
                </div>
                <div className="aside1--elements">
                    <button className="button button--delete" onClick={() => goToUnregister()}>Eliminar usuario</button>
                </div>
                <div className="aside1--elements">
                    <button type="button" className="button button--back--profile" onClick={() => goHome()}>Volver atrás</button>
                </div>
            </aside>
            <aside className="grid__center-aside">
                <div className="aside1--elements aside1--elements-profile">
                    <span><h3>Nombre y Apellido</h3></span>
                    <span className="actual--data">{user?.name}</span>
                </div>
                <div className="aside1--elements aside1--elements-profile">
                    <span><h3>Usuario</h3></span>
                    <span className="actual--data">{user?.username}</span>
                </div>
                <div className="aside1--elements aside1--elements-profile">
                    <span><h3>Dirección Email</h3></span>
                    <span className="actual--data">{user?.email}</span>
                </div>
                
            </aside>
        </div>
    )
}

export default Profile