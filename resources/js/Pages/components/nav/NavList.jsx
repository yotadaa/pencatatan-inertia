import { motion } from 'framer-motion';
import { menu, storeCurrentMenu, retrieveCurrentMenu } from '../../assets/nav/identity';
import { useContext, useEffect, useState } from 'react';
import logoutIcon from '../../assets/logout.png';
import { Inertia } from "@inertiajs/inertia";
import Context from '../../provider/context';

function NavList({ isShrunk, navPinned }) {

    const { setProcessing } = useContext(Context);

    const attemptLogout = async () => {
        try {
            setProcessing(true)
            Inertia.post('/auth/logout')
        } catch (e) {
            console.error(e);
            console.log('Login tidak berhasil')
        } finally {
        }
    }

    const [currentMenu, setCurrentMenu] = useState(parseInt(retrieveCurrentMenu()) | 0);

    useEffect(() => {
        setProcessing(false);
    })

    return (
        <motion.div className='mt-5 p-1 flex flex-col'
            style={{
                fontFamily: 'sans-serif',
                fontSize: 14
            }}
        >
            <ul className=''>
                {menu.map((item, index) => (
                    <div key={index}>
                        <motion.li
                            className={`p-[5px] cursor-pointer h-10 rounded-full flex items-center mb-2`}
                            style={{
                                gap: 10,
                                backgroundColor: index === currentMenu ? item.bg : 'transparent',
                            }}
                            animate={{
                                backgroundColor: index === currentMenu ? item.bg : '#F9FAFB',
                                transform: !isShrunk && !navPinned ? 'translateX(0px)' : 'translateX(0px)',
                                width: isShrunk || navPinned ? 215 : 40
                            }}
                            whileHover={{
                                backgroundColor: item.bg,
                            }}

                            onClick={() => {
                                storeCurrentMenu(index);
                                setCurrentMenu(index);
                                if (currentMenu !== index) {
                                    console.log(index)
                                    Inertia.visit(route(item.path));
                                    setProcessing(true);
                                }
                            }}
                        >
                            <motion.img
                                src={item.icon}
                                className={`w-10`}
                                style={{
                                    padding: !isShrunk && !navPinned ? 3 : 8
                                }}
                                animate={{
                                    padding: !isShrunk && !navPinned ? 3 : 8
                                }}
                            />
                            <motion.div
                                animate={{
                                    opacity: navPinned || isShrunk ? 1 : 0
                                }}
                                className='poppins'
                                style={{
                                    fontWeight: 500
                                }}
                            >
                                {item.name}
                            </motion.div>
                        </motion.li>
                    </div >
                ))}
                <motion.li
                    className={`p-[5px] cursor-pointer h-10 rounded-full flex items-center mb-2 `}
                    style={{
                        gap: 10,
                    }}
                    animate={{
                        transform: !isShrunk && !navPinned ? 'translateX(0px)' : 'translateX(0px)',
                        width: isShrunk || navPinned ? 215 : 40,
                        opacity: 1,
                    }}
                    whileHover={{
                        backgroundColor: '#F87171',
                    }}
                >
                    <motion.img
                        src={logoutIcon}
                        className={`w-10`}
                        style={{
                            padding: !isShrunk && !navPinned ? 3 : 8
                        }}
                        animate={{
                            padding: !isShrunk && !navPinned ? 3 : 8
                        }}
                    />
                    <motion.div
                        animate={{
                            opacity: navPinned || isShrunk ? 1 : 0
                        }}
                        className='font-semibold'
                        onClick={() => {
                            attemptLogout();
                        }}
                    >
                        Logout
                    </motion.div>
                </motion.li>
            </ul>
        </motion.div >
    )
}

export default NavList;

