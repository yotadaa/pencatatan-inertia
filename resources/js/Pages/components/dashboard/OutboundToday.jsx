import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import increaseIcon from '../../assets/increase.png'
import logsIcon from '../../assets/checklist.png'
import CheckButton from './CheckButton';

export default function OutboundToday({ windowSize }) {


    const initialState = {
        item: 50,
        percentage: 1234
    }
    const [count, setCount] = useState({
        item: 0,
        percentage: 0,
    })
    const counter = [0, 1, 2, 3, 4]

    useEffect(() => {
        if (count.item < initialState.item) {
            const timeout = setTimeout(() => {
                setCount(prev => ({
                    ...prev,
                    item: prev.item + 1,
                    percentage: prev.percentage + (initialState.percentage / initialState.item)
                }))
            }, 5);

            return () => clearTimeout(timeout);
        }
    }, [count])
    return (
        <div className={`relative bg-emerald-50  rounded-md flex flex-col p-2 shadow-sm overflow-x-auto overflow-y-hidden max-h-[118px]  shadow-emerald-600 mb-3
        ${windowSize.w > 600 ? "w-1/2" : "w-full"}`}
            onClick={() => {
                setCount(prev => ({
                    ...prev,
                    percentage: -prev.percentage,
                }))
            }}
            style={{
                width: '100%'
            }}
        >
            <header className='text-emerald-600 font-bold mb-2'
                style={{
                    zIndex: 2,
                }}
            >Outbound</header>
            <main className='h-full flex justify-center flex-col'
                style={{
                    zIndex: 2
                }}
            >
                <div className='font-bold text-emerald-600 flex items-center gap-2'>
                    <span className='text-4xl'>{count.item}</span>
                    <span className={`text-md ${count.percentage > 0 ? " bg-emerald-100 " : " bg-rose-100 "} px-2 rounded-md flex gap-1`}>
                        <motion.img src={increaseIcon}
                            style={{
                                width: 20,
                                transform: count.percentage > 0 ? 'scaleY(1)' : 'scaleY(-1)',
                            }}
                            animate={{
                                transform: count.percentage > 0 ? 'scaleY(1)' : 'scaleY(-1)',
                            }}
                        />
                        <span className={`${count.percentage > 0 ? " text-emerald-600 " : " text-rose-600 "}`}>{Math.round(count.percentage)}%</span>
                    </span>
                </div>
            </main>
            <footer className='font-semibold text-md mt-2 text-emerald-600'
                style={{
                    zIndex: 2
                }}
            >
                Prospek kamu bagus!
            </footer>
            <div
                style={{
                    width: 150,
                    position: "absolute",
                    right: 0,
                    zIndex: 0,
                    overflowX: 'hidden',
                    zIndex: 1
                }}
            >
                <img src={logsIcon}
                    style={{
                        width: 150,
                        height: 150,
                        transform: 'scaleX(-1) translateX(-50px)',
                        zIndex: 1,
                        // filter: 'drop-shadow(0px 0px 2px rgba(5, 150, 105, .7)',
                    }}
                    draggable={false}
                />
            </div>
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    zIndex: 2,
                    overflowX: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                }}
                className='p-1 cursor-pointer hover:contrast-125'
            >
                <CheckButton>
                    Cek sekarang
                </CheckButton>
            </div>
            <div
                className='h-full absolute left-0 top-0 w-full overflow-hidden'
                style={{
                    zIndex: 0
                }}
            >
                <div className='relative w-full h-full'>
                    {counter.map((item) =>
                        <div
                            key={item}
                            className='absolute rounded-full '
                            style={{
                                width: 200,
                                height: 200,
                                top: -50,
                                right: 125 - (75 * (item)),
                                scale: 0.5,
                                backgroundColor: `rgba(255,255,255, 0.${item + 1})`,
                                boxShadow: `-5px 0px 5px rgba(0,0,0, 0.0${item + 1})`,
                            }}
                        ></div>
                    )}
                </div>
            </div>
        </div>
    )
}
