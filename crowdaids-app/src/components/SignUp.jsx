import React from 'react'
import logger from '../logger'
import { useContext } from 'react'
import AppContext from './AppContext'
import { registerUser } from '../logic'
import cablue from '../assets/cablue.png'

function SignUp() {
    logger.info('SignUp -> render')

    const { showSpinner, hideSpinner, showModal, goToSignIn } = useContext(AppContext)

    return <>
        <div className='landing'>
            <div className='logo'>
                <img className='logo--image' src={cablue} alt='' />
            </div>
            <form className='register container container--vertical' onSubmit={async event => {
                event.preventDefault()

                const { target: { reset, name: { value: name }, username: { value: username }, email: { value: email }, password: { value: password } } } = event

                const user = {
                    name,
                    username,
                    email,
                    password
                }

                try {
                    showSpinner()

                    await registerUser(user)

                    hideSpinner()

                    showModal('Éxito', 'Cuenta creada satisfactoriamente')

                    goToSignIn()
                } catch ({ message }) {
                    hideSpinner()

                    showModal('Error', message)
                }

                event.target.reset()
            }}>
                <h3 className='titles'>Registro</h3>
                <input type='text' placeholder='Nombre y Apellido' id='name'></input>
                <input type='email' placeholder='Email' id='email'></input>
                <input type='text' placeholder='Usuario' id='username'></input>
                <input type='password' placeholder='Contraseña' id='password'></input>

                <div className='container'>
                    <button type='submit' className='button'>Crear cuenta</button>
                </div>
                <hr />
                <div>
                    <button type='button' className='button button--grey' onClick={() => goToSignIn()}>Iniciar Sesión</button>
                </div>
            </form>
        </div>
    </>
}

export default SignUp