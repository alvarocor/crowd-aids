import React from 'react'
import logger from '../logger'
import { updateUserData } from '../logic'
import { useContext } from 'react'
import AppContext from './AppContext'

function ChangeData({ goToProfile, theme }) {
    logger.info('ChangeData -> render')

    const { showModal, showSpinner, hideSpinner } = useContext(AppContext)

    return (
        <div className={`${theme} modify container container--vertical`} onSubmit={async event => {
            event.preventDefault()

            const { target: { name: { value: name }, email: { value: email }, username: { value: username } } } = event

            const user = {
                name,
                email,
                username
            }

            const { token } = sessionStorage

            try {
                showSpinner()

                await updateUserData(token, user)

                showModal('Éxito', 'Tus datos fueron actualizados.')

                hideSpinner()

            } catch ({ message }) {

                showModal('Error', message)

                hideSpinner()
            }

            event.target.reset()
        }}>
            <form className='container container--vertical'>
                <h3 className='titles'>Modificar datos</h3>
                <input type='text' placeholder='Nombre y Apellido' id='name' />
                <input type='email' placeholder='Email' id='email' />
                <input type='text' placeholder='Usuario' id='username' />

                <div className='container'>
                    <button className='button' onClick={() => goToProfile()}>Volver atrás</button>
                    <button className='button button--red'>Actualizar</button>
                </div>
            </form>
        </div>
    )
}

export default ChangeData