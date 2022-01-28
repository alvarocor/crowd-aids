import React from 'react'
import logger from '../logger'
import { unregisterUser } from '../logic'
import { useContext } from 'react'
import AppContext from './AppContext'

function Unregister({ goToProfile, theme }) {
    logger.info('Unregister -> render')

    const { showModal, showSpinner, hideSpinner, resetTokenAndGoToLogin } = useContext(AppContext)

    return (
        <div className={`${theme} container container--vertical`} onSubmit={async event => {
            event.preventDefault()

            const { target: { password: { value: password } } } = event

            const user = {
                password: password
            }

            const { token } = sessionStorage

            try {
                showSpinner()

                await unregisterUser(token, user)

                showModal('Éxito', 'Has eliminado tu cuenta.')

                hideSpinner()

                resetTokenAndGoToLogin()

            } catch ({ message }) {

                showModal('Error', message)

                hideSpinner()
            }

            event.target.reset()
        }}>
            <form className='container container--vertical'>
                <h3 className='titles'>Eliminar cuenta</h3>
                <input type='password' placeholder='Contraseña' id='password' />

                <div className='container'>
                    <button type='button' className='button' onClick={() => goToProfile()}>Volver atrás</button>
                    <button className='button button--red'>Eliminar usuario</button>
                </div>
            </form>
        </div>
    )
}

export default Unregister