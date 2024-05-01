import { useContext, useEffect, useState } from 'react';
import { lightTheme } from '../theme';
import { motion } from 'framer-motion';

import sampleLogo from '../../assets/nav/logo.png';
import NavList from './NavList';
import Context from '../../provider/context';



function Navigasi({ props }) {

    const { navPos, mouseDown } = props;

    const { isShrunk, setIsShrunk, wideWindow, windowSize, setNavHover, rightNav, properties } = useContext(Context);
    const [pinNav, setPinNav] = useState(false);
    const theme = lightTheme;

    return (
        <motion.nav
            className='h-screen p-2'
            style={{
                width: 80,
                transform: 'translateX(-80px)',
                position: wideWindow ? 'relative' : 'fixed',
                left: pinNav ? 0 : navPos.x,
                top: pinNav ? 0 : navPos.y,
                fontFamily: 'segoe ui'
            }}
            animate={{
                width: isShrunk ? 250 : (pinNav ? 250 : (!wideWindow && pinNav ? windowSize.w : (!wideWindow && !pinNav ? 75 : (wideWindow && !pinNav ? 80 : 80)))),
                height: !wideWindow ? (pinNav ? window.innerHeight : 80) : window.innerHeight,
                transform: 'translateX(0px)',
            }}
            whileHover={{
                width: wideWindow ? 250 : (pinNav ? 250 : 80),
                transform: 'translateX(0px)',
            }}

            onMouseEnter={() => {
                setIsShrunk(true);
            }}
            onMouseLeave={() => {
                setIsShrunk(false);
            }}

            onMouseDown={(event) => {
                setNavHover(true)
            }}

            onMouseUp={() => setNavHover(false)}
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
                            width: pinNav ? '100%' : 30,
                            marginLeft: pinNav || isShrunk ? 0 : 3
                        }}

                        onClick={(event) => {
                            setIsShrunk(!isShrunk);
                            setPinNav(!pinNav);
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
                                opacity: pinNav || isShrunk && wideWindow ? 1 : 0,
                            }}
                        >{properties.title}</p>
                    </motion.div>
                </div>
                <NavList isShrunk={isShrunk} pinNav={pinNav} />
            </div>

        </motion.nav >
    )
}

export default Navigasi;
