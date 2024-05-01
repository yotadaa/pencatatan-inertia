
import { useEffect, useState } from "react";
import Navigasi from "../nav/Navigasi";
import { lightTheme } from "../theme";
import { useContext } from "react";
import Context from "../../provider/context";
import { Navigate } from "react-router-dom";

function Main({ Element }) {

    const getUrls = () => {
        return window.location.href.split("/").slice(-1)
    }

    const shouldIgnored = () => {
        return getUrls === 'login';
    }

    const [navPos, setNavPos] = useState({
        x: 0,
        y: 0
    })

    const { navHover, wideWindow, setRightNav, rightNav } = useContext(Context);
    const [mouseDown, setMouseDown] = useState(false);

    const resetNavPos = () => {
        setNavPos({
            x: 0,
            y: 0
        })
    }

    const theme = lightTheme;

    useEffect(() => {
        if (wideWindow) {
            setNavPos(prev => ({
                x: 0,
                y: 0
            }))
        }
    }, [wideWindow])

    const [isAuth, setIsAuth] = useState(false);
    const toNotIncluded = ["dashboard", "register"];

    // if (getUrls !== "login" || getUrls !== "register") {
    //     if (!isAuth) {
    //         return (
    //             <Navigate to="/login" />
    //         )
    //     }
    // }

    return (
        <div className={`w-screen h-screen ${theme.base} overflow-hidden flex`}
            style={{
                cursor: (mouseDown && navHover) ? 'move' : 'default',
                transform: rightNav ? 'scaleX(-1)' : 'scaleX(1)'
            }}

            onMouseDown={() => setMouseDown(true)}
            onMouseUp={(e) => {
                if (mouseDown && navHover && !wideWindow) {
                    if (e.clientX < 100 && e.clientY < 100) resetNavPos();
                }
                setMouseDown(false);
            }}
            onMouseMove={(event) => {
                if (mouseDown && navHover && !wideWindow) {
                    setNavPos(prev => ({
                        x: event.clientX - 40,
                        y: event.clientY - 40,
                    }))
                } else if (mouseDown && navHover && wideWindow) {
                    if (event.clientX > window.innerWidth - 90) {
                        setRightNav(true)
                    } else if (event.clientX < 90) {
                        setRightNav(false);
                    }
                }
            }}
        >
            <Navigasi props={{ navPos, mouseDown }} className='' />
            <Element />

        </div>
    )
}

export default Main;
