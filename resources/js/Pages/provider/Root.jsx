

import { useEffect, useState } from 'react';
import Context from './context';
import FormRegister from '../components/AuthPage/Index';
import Dashboard from '../components/dashboard/Dashboard';
import Main from '../components/main/Main';
import axios from 'axios';

const Root = ({ isAuth, mode, failed, message }) => {

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
        console.log(wideWindow)
    }, [windowSize])

    const [loginFailed, setLoginFailed] = useState(false);

    const contextValue = {
        isShrunk, setIsShrunk, wideWindow, setWideWindow, windowSize, setNavHover, navHover,
        rightNav, setRightNav, properties, setProperties, loginFailed, setLoginFailed
    }

    return (
        <Context.Provider value={contextValue}>
            {isAuth ? <Main Element={Dashboard} isAuth={isAuth} /> : <FormRegister failed={failed} message={message} mode={mode} />}
            {/* <Main Element={Dashboard} /> */}
        </Context.Provider>
    )
};

export default Root;
