import React from 'react';
import { useState, useEffect, useContext } from 'react'
import './Home.sass'
import logger from '../logger'
import Search from './Search'
import Results from './Results'
import Detail from './Detail'
import Favorites from './Favorites'
import Profile from './Profile'
import ChangeData from './Change-data'
import ChangePassword from './Change-password'
import Unregister from './Unregister'
import Welcome from './Welcome'
import { retrieveUser } from '../logic'
import { Routes, Route, useNavigate } from 'react-router-dom'
import AppContext from './AppContext'

function Home() {
    logger.info("Home -> constructor")

    const { showSpinner, hideSpinner, resetTokenAndGoToLogin } = useContext(AppContext)

    const [theme, setTheme] = useState('light')
    const [user, setUser] = useState(null)
    const [beach, setBeach] = useState({})
    const [query, setQuery] = useState({})
    const navigate = useNavigate()

    useEffect(async () => {
        logger.info('Home -> useEffect (componentDidMount)')

        const { token } = sessionStorage

        if (token) {
            try {
                showSpinner()

                const user = await retrieveUser(token)

                hideSpinner()

                const { name } = user

                setUser(name)

            } catch ({ message }) {
                hideSpinner()

                navigate('/')

                resetTokenAndGoToLogin()
            }
        }
    }, [])

    const search = (query) => {
        setQuery(query)

        navigate(query ? `/search?q=${query}` : '/')
    }

    const goToItem = (beach, id) => {
        const { name } = beach
        setBeach(beach)
        navigate(`/forecast/${name}/${id}`)
    }

    const goToProfile = () => navigate('/profile')

    const goToChangeData = () => navigate('/change-data')

    const goToChangePassword = () => navigate('/change-password')

    const goToUnregister = () => navigate('/unregister')

    const goHome = () => navigate('/')

    const goToSearch = () => search(query)

    const toggleLamp = () => setTheme(theme === 'light' ? 'dark' : 'light')

    return <>
        <Search
            user={user}
            onSearch={search}
            query={query}
            onItem={goToItem}
            goToProfile={goToProfile}
            toggleLamp={toggleLamp}
            theme={theme}
        />
                <Routes>
                    <Route path='/' element={
                        <Welcome
                            onItem={goToItem}
                            theme={theme} />
                    } />

                    <Route path="/search" element={
                        <Results
                            onItem={goToItem}
                            theme={theme} />
                    } />

                    <Route path="/forecast/:name/:id" element={
                        <Detail
                            onGoBack={goToSearch}
                            beach={beach}
                            theme={theme} />
                    } />

                    <Route path="/favs" element={
                        <Favorites
                            onItem={goToItem}
                            theme={theme} />
                    } />

                    <Route path="/profile" element={
                        <Profile
                            goToChangeData={goToChangeData}
                            goToChangePassword={goToChangePassword}
                            goToUnregister={goToUnregister}
                            goHome={goHome}
                            theme={theme} />
                    } />

                    <Route path='/change-data' element={
                        <ChangeData
                            goToProfile={goToProfile}
                            theme={theme} />
                    } />

                    <Route path='/change-password' element={
                        <ChangePassword
                            goToProfile={goToProfile}
                            theme={theme} />
                    } />

                    <Route path='/unregister' element={
                        <Unregister
                            goToProfile={goToProfile}
                            theme={theme} />
                    } />
                </Routes>
    </>
}

export default Home