import { motion } from 'framer-motion';
import { menu, storeCurrentMenu } from '../../assets/nav/identity';
import { useContext, useState } from 'react';
import logoutIcon from '../../assets/logout.png';
import { Inertia } from "@inertiajs/inertia";
import Context from '../../provider/context';

function NavList({ isShrunk, navPinned }) {

    const { setProcessing, currentMenu, setCurrentMenu } = useContext(Context);

    const attemptLogout = async () => {
        try {
            setProcessing(true)
            Inertia.post('/auth/logout')
        } catch (e) {
            console.error(e);
            console.log('Logout tidak berhasil')
        } finally {
        }
    }

    const attemptChangePage = async (item, index) => {
        setProcessing(true);
        storeCurrentMenu(index);
        if (currentMenu !== index) {
            console.log(index);
            Inertia.get(route(item.path));
        }
    }

    const [hoverMenu, setHoverMenu] = useState(-1);

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
                        <li
                            className={`p-[5px] cursor-pointer h-10 rounded-full flex items-center mb-2`}
                            style={{
                                gap: 10,
                                backgroundColor: index === currentMenu || hoverMenu === index ? item.bg : '#F9FAFB',
                                transform: !isShrunk && !navPinned ? 'translateX(0px)' : 'translateX(0px)',
                                width: isShrunk || navPinned ? 215 : 40
                            }}
                            onMouseEnter={() => {
                                setHoverMenu(index);
                            }}
                            onMouseLeave={() => {
                                setHoverMenu(-1);
                            }}

                            onClick={() => {
                                attemptChangePage(item, index);
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
                        </li>
                    </div >
                ))}
                <li
                    className={`p-[5px] cursor-pointer h-10 rounded-full flex items-center mb-2 hover:bg-rose-400 `}
                    style={{
                        gap: 10,
                        transform: !isShrunk && !navPinned ? 'translateX(0px)' : 'translateX(0px)',
                        width: isShrunk || navPinned ? 215 : 40,
                        opacity: 1,
                    }}
                    onClick={() => {
                        attemptLogout();
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
                    >
                        Logout
                    </motion.div>
                </li>
            </ul>
        </motion.div >
    )
}

export default NavList;

