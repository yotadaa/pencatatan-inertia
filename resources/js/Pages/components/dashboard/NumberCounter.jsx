import { animate } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { formatNumber } from "../../assets/variables";

function NumberCounter({ from = 0, to, decimalPlaces = 2 }) {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;

        const controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
                node.textContent = formatNumber(value.toFixed(2), { decimalPlaces: decimalPlaces });
            },
        });

        return () => controls.stop();
    }, [from, to]);

    return <p style={{ display: "inline-flex" }} ref={nodeRef} />;
}

export default NumberCounter;
