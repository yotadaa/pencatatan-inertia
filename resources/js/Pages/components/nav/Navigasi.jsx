import { useContext, useEffect, useState } from 'react';
import { lightTheme } from '../theme';
import { motion } from 'framer-motion';

import sampleLogo from '../../assets/nav/logo.png';
import NavList from './NavList';
import Context from '../../provider/context';



function Navigasi({ props }) {

    const { navPos } = props;

    const { wideWindow, windowSize, setNavHover, rightNav, properties, navStatus, setNavStatus, navHover } = useContext(Context);
    const theme = lightTheme;

    return (
        <motion.nav
            className='h-screen p-2 fixed'
            style={{
                width: !wideWindow ? ('100%') : (navStatus.pinned ? 250 : 80),
                transform: 'translateX(-80px)',
                left: navStatus.pinned ? 0 : navPos.x,
                top: navStatus.pinned ? 0 : navPos.y,
                fontFamily: 'segoe ui',
                transform: 'translateX(0px)',
            }}
            animate={{
                width: (!wideWindow && !navStatus.pinned) ? ('100%') : navStatus.shrunk ? 250 : (navStatus.pinned ? 250 : (!wideWindow && navStatus.pinned ? windowSize.w : (!wideWindow && !navStatus.pinned ? 75 : (wideWindow && !navStatus.pinned ? 80 : 80)))),
                height: !wideWindow ? (navStatus.pinned ? window.innerHeight : 80) : window.innerHeight,
            }}
            whileHover={{
                width: wideWindow && navStatus.shrunk ? 250 : (navStatus.pinned ? 250 : (!navStatus.pinned && !wideWindow ? '100%' : 80)),
                transform: 'translateX(0px)',
            }}

            onMouseEnter={() => {
                setNavStatus(prev => ({
                    ...prev,
                    shrunk: true,
                }))
            }}
            onMouseLeave={() => setNavStatus(prev => ({
                ...prev,
                shrunk: navStatus.pinned ? true : false,
            }))}
        >
            <div
                className={`${theme.navBase} w-full h-full rounded-md shadow-lg overflow-hidden p-1 select-none`}
                style={{
                    transform: rightNav ? 'scaleX(-1)' : 'scaleX(1)'
                }}
            >
                <div className='border-b border-dashed border-slate-300 p-2 '>
                    <motion.div
                        id='navigation-inner'
                        className={`mb-1 bg-gray-100 rounded-full flex items-center`}
                        style={{
                            cursor: 'pointer',
                        }}
                        animate={{
                            scale: 1,
                            width: navStatus.pinned ? '100%' : 30,
                            marginLeft: navStatus.pinned || navStatus.shrunk ? 0 : 3
                        }}

                        onClick={() => {
                            setNavStatus(prev => ({
                                ...prev,
                                pinned: !prev.pinned,
                                shrunk: navStatus.pinned ? !prev.shrunk : true,
                            }));
                        }}
                    >
                        <img src={sampleLogo}
                            style={{
                                width: 30
                            }}
                            draggable='false' className='select-none' />
                        <p
                            className='font-semibold'
                            style={{
                                marginLeft: 10,
                                opacity: navStatus.pinned || navStatus.shrunk && wideWindow ? 1 : 0,
                            }}
                        >{properties.title}</p>
                    </motion.div>
                </div>
                <NavList isShrunk={navStatus.shrunk} navPinned={navStatus.pinned} />
            </div>

        </motion.nav >
    )
}

export default Navigasi;
