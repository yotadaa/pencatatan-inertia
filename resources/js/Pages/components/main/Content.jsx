import Context from "../../provider/context";
import { useContext } from "react";

const Content = ({ Element }) => {

    const { rightNav, wideWindow } = useContext(Context);

    return (
        <main className=" w-full h-full p-2"

            style={{
                transform: rightNav ? 'scaleX(-1)' : 'scaleX(1)',
                zIndex: wideWindow ? 0 : -1,
            }}
        >
            <Element />
        </main>
    )
}

export default Content;
