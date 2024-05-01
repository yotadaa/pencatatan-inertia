import { motion } from "framer-motion";
import visibilityIcon from '../../assets/eye.png'
import { useState } from "react";

const Input = ({ animate, onChange, value, placeholder, labels, type = 'text' }) => {

    const inputStyle = "rounded-md bg-gray-200 w-full p-3 placeholder:text-gray-500 placeholder:text-md focus:bg-gray-100 focus:outline-gray-500 focus:outline-0";
    const [hoverVisibility, setHoverVisibility] = useState(false);
    const [visible, setVisible] = useState(true);

    return (
        <>
            <motion.label className="pb-0 mb-0"
                style={{
                    fontSize: 14,
                    opacity: 0,
                    fontFamily: '"Poppins", sans-serif',
                }}
                animate={{
                    opacity: (value.length > 0) ? 1 : 0,
                    transform: (value.length > 0) ? 'translateY(8px) translateX(5px)' : 'translateY(20px) translateX(11px) ',
                }}
            >
                {labels}
            </motion.label>
            <div className="flex gap-x-1 justify-center items-center">
                <input
                    className={inputStyle + " mt-0 focus:border-gray-500 focus:border-[1px] box-border"}
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                    }}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    type={type === 'password' ? (visible ? 'password' : 'text') : 'text'}
                    required
                />
                <div className="relative h-11 w-14 rounded-full"
                    style={{
                        display: type === 'password' ? 'block' : 'none',
                    }}
                    onMouseEnter={() => {
                        console.log('Outter')
                        setHoverVisibility(true);
                    }}
                    onMouseLeave={() => {
                        setHoverVisibility(false);
                    }}

                    onClick={() => {
                        setVisible(!visible);
                    }}
                >
                    <motion.div
                        className="absolute bg-slate-200 h-11 w-11 rounded-full left-0 top-0"
                        animate={{
                            scale: hoverVisibility ? 1 : 0,
                        }}
                    >
                    </motion.div>
                    <img
                        className="p-2 absolute left-0 top-0"
                        src={visibilityIcon}
                    />
                    <motion.div
                        className="absolute bg-gray-600 h-[3px] left-0 top-0"
                        style={{
                            transform: `rotate(40deg) translateX(14px) translateY(1px)`,
                            transformOrigin: 'top left',
                            width: 34
                        }}
                        animate={{
                            width: visible ? 34 : 0,
                        }}
                    >
                    </motion.div>
                </div>
            </div>
        </>
    )
}

export default Input;
