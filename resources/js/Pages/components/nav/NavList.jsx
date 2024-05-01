import { motion } from 'framer-motion';
import { menu, storeCurrentMenu, retrieveCurrentMenu } from '../../assets/nav/identity';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import logoutIcon from '../../assets/logout.png';

function NavList({ isShrunk, pinNav }) {

    const [currentMenu, setCurrentMenu] = useState(parseInt(retrieveCurrentMenu()) | 0);

    return (
        <motion.div className='mt-5 p-1 flex flex-col'
            style={{
                fontFamily: 'sans-serif',
                fontSize: 14
            }}
        >
            <ul>
                {menu.map((item, index) => (
                    <Link to={item.path} key={index}>
                        <motion.li
                            className={`p-[5px] cursor-pointer h-10 rounded-full flex items-center mb-2`}
                            style={{
                                gap: 10,
                            }}
                            // '#F8FAFC'
                            animate={{
                                backgroundColor: index === currentMenu ? item.bg : '#F8FAFC',
                                transform: !isShrunk && !pinNav ? 'translateX(0px)' : 'translateX(0px)',
                                width: isShrunk || pinNav ? 215 : 40
                            }}
                            whileHover={{
                                backgroundColor: item.bg,
                            }}

                            onClick={() => {
                                storeCurrentMenu(index);
                                setCurrentMenu(index);
                            }}
                        >
                            <motion.img
                                src={item.icon}
                                className={`w-10`}
                                animate={{
                                    padding: !isShrunk && !pinNav ? 3 : 8
                                }}
                            />
                            <motion.div
                                animate={{
                                    opacity: pinNav || isShrunk ? 1 : 0
                                }}
                            >
                                {item.name}
                            </motion.div>
                        </motion.li>
                    </Link>
                ))}
                <motion.li
                    className={`p-[5px] cursor-pointer h-10 rounded-full flex items-center mb-2 `}
                    style={{
                        gap: 10,
                    }}
                    animate={{
                        transform: !isShrunk && !pinNav ? 'translateX(0px)' : 'translateX(0px)',
                        width: isShrunk || pinNav ? 215 : 40,
                        opacity: 1,
                    }}
                    whileHover={{
                        backgroundColor: '#F87171',
                    }}
                >
                    <motion.img
                        src={logoutIcon}
                        className={`w-10`}
                        animate={{
                            padding: !isShrunk && !pinNav ? 3 : 8
                        }}
                    />
                    <motion.div
                        animate={{
                            opacity: pinNav || isShrunk ? 1 : 0
                        }}
                        className='font-semibold'
                    >
                        Logout
                    </motion.div>
                </motion.li>
            </ul>
        </motion.div >
    )
}

export default NavList;