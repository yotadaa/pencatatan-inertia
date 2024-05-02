import Context from "../../provider/context";
import { useContext } from "react";
import { motion } from "framer-motion";

const Content = ({ Element }) => {

    const { rightNav, wideWindow, navStatus } = useContext(Context);

    return (
        <motion.main className=" h-full p-2 fixed"
            style={{
                transform: rightNav ? 'scaleX(-1)' : 'scaleX(1)',
                zIndex: wideWindow ? 0 : -1,
                width: window.innerWidth - (navStatus.pinned || navStatus.shrunk ? 250 : 80),
                left: navStatus.pinned || navStatus.shrunk ? 250 : 80,
            }}
            animate={{
                width: window.innerWidth - (navStatus.pinned || navStatus.shrunk ? 250 : 80),
                left: navStatus.pinned || navStatus.shrunk ? 250 : 80,
            }}
        >
            <div className="bg-red-300 w-full h-full"><Element /></div>
        </motion.main>
    )
}

export default Content;
