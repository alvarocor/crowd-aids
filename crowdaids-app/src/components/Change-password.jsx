import React from 'react'
import logger from '../logger'
import { updateUserData } from '../logic'
import { useContext } from 'react'
import AppContext from './AppContext'

function ChangePassword({ goToProfile, theme }) {
    logger.info('ChangePassword -> render')

    const { showModal, showSpinner, hideSpinner } = useContext(AppContext)

    return (
        <div className={`${theme} container container--vertical`} onSubmit={async event => {
            event.preventDefault()

            const { target: { password: { value: password }, oldPassword: { value: oldPassword } } } = event

            const user = {
                password,
                oldPassword
            }

            const { token } = sessionStorage

            try {
                showSpinner()

                await updateUserData(token, user)

                showModal('Éxito', 'Tu contraseña fue actualizada.')

                hideSpinner()

            } catch ({ message }) {

                showModal('Error', message)

                hideSpinner()
            }

            event.target.reset()
        }}>

            <form className='container container--vertical'>
                <h3 className="titles">Cambiar contraseña</h3>
                <input type='password' placeholder='Nueva contraseña' id='password' />
                <input type='password' placeholder='Contraseña anterior' id='oldPassword' />

                <div className='container'>
                    <button className='button' onClick={() => goToProfile()}>Volver atrás</button>
                    <button className='button button--red'>Acutalizar</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePassword