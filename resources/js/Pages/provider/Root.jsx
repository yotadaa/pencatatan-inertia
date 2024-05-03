

import { useEffect, useState } from 'react';
import Context from './context';
import Dashboard from '../components/dashboard/Dashboard';
import Main from '../components/main/Main';
import Loading from '../components/other/Loading';
import RegisterPage from '../components/AuthPage/Index';
import { getLocalStorage, setLocalStorage } from '../assets/variables';
import { retrieveCurrentMenu } from '../assets/nav/identity';
import { menu } from '../assets/nav/identity';

const Root = ({ isAuth, mode, failed, message, props }) => {

    const [currentMenu, setCurrentMenu] = useState(parseInt(retrieveCurrentMenu()) | 0);
    const [navHover, setNavHover] = useState(false)
    const [isShrunk, setIsShrunk] = useState(false);
    const [wideWindow, setWideWindow] = useState(true);
    const [windowSize, setWindowSize] = useState({
        w: window.innerWidth,
        h: window.innerHeight
    });
    const [rightNav, setRightNav] = useState(false);

    const [properties, setProperties] = useState({
        title: 'Plinplan',
        theme: 0,
    })

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowSize(prev => ({
                ...prev,
                w: window.innerWidth,
            }))
        })
    }, [])

    useEffect(() => {
        if (windowSize.w < 400) {
            setWideWindow(false);
        } else {
            setWideWindow(true);
        }
    }, [windowSize])

    const [loginFailed, setLoginFailed] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [authFailedMessage, setAuthFailedMessage] = useState({
        title: '',
        body: '',
    })

    const [navStatus, setNavStatus] = useState({
        pinned: getLocalStorage('nav-pinned') === null ? true : (getLocalStorage('nav-pinned')),
        shrunk: getLocalStorage('nav-shrunk') === null ? false : (getLocalStorage('nav-pinned')),
        right: getLocalStorage('nav-right') === null ? false : (getLocalStorage('nav-pinned')),
    })

    useEffect(() => {
        setLocalStorage('nav-pinned', navStatus.pinned);
        setLocalStorage('nav-shrunk', navStatus.shrunk);
    }, [navStatus])


    const contextValue = {
        isShrunk, setIsShrunk, wideWindow, setWideWindow, windowSize, setNavHover, navHover,
        rightNav, setRightNav, properties, setProperties, loginFailed, setLoginFailed,
        processing, setProcessing, authFailedMessage, setAuthFailedMessage, navStatus, setNavStatus, currentMenu, setCurrentMenu
    }

    return (
        <Context.Provider value={contextValue}>
            <Loading />
            {isAuth ? <Main props={props} Element={menu[currentMenu].element} isAuth={isAuth} /> : <RegisterPage failed={failed} message={message} mode={mode} />}
        </Context.Provider>
    )
};

export default Root;
