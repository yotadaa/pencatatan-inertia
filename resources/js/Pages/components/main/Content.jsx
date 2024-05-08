import Context from "../../provider/context";
import { useContext } from "react";
import { motion } from "framer-motion";

const Content = ({ Element, props }) => {

    const { rightNav, wideWindow, navStatus } = useContext(Context);

    return (
        <motion.main className=" h-full p-2 fixed min-w-[380px] overflow-y-scroll style-3 "
            style={{
                transform: rightNav ? 'scaleX(-1)' : 'scaleX(1)',
                zIndex: wideWindow ? 0 : -1,
                width: window.innerWidth - (navStatus.pinned || navStatus.shrunk ? 250 : 80),
                left: navStatus.pinned || navStatus.shrunk ? 250 : 80,
            }}
            animate={{
                width: window.innerWidth - (navStatus.pinned ? 250 : 80),
                left: navStatus.pinned && wideWindow ? 250 : (!wideWindow ? 0 : 80),
                top: !wideWindow ? 80 : 0,
                zIndex: -1,
            }}
        >
            <Element props={props} />
        </motion.main>
    )
}

export default Content;
