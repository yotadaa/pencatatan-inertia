import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import increaseIcon from '../../assets/increase.png'


export default function OutboundToday({ }) {


    const initialState = {
        item: 50,
        percentage: 1234
    }
    const [count, setCount] = useState({
        item: 0,
        percentage: 0,
    })

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
        <div className="relative bg-green-50  rounded-md flex flex-col p-2 shadow-md overflow-x-auto overflow-y-hidden min-w-[200px] w-1/3 shadow-emerald-600"
            onClick={() => {
                setCount(prev => ({
                    ...prev,
                    percentage: -prev.percentage,
                }))
            }}
        >
            <header className='text-emerald-600 font-bold mb-2'>Outbound</header>
            <main className='h-full flex justify-center flex-col'>
                <div className='font-bold text-emerald-600 flex items-center gap-2'>
                    <span className='text-4xl'>{count.item}</span>
                    <span className='text-md bg-emerald-100 h-full px-2 rounded-md flex gap-1'>
                        <motion.img src={increaseIcon}
                            style={{
                                width: 20,
                                transform: count.percentage > 0 ? 'scaleY(1)' : 'scaleY(-1)',
                            }}
                            animate={{
                                transform: count.percentage > 0 ? 'scaleY(1)' : 'scaleY(-1)',
                            }}
                        />
                        {Math.round(count.percentage)}%
                    </span>
                </div>
            </main>
            <footer className='font-bold text-md mt-2 text-emerald-600'>
                Prospek kamu bagus!
            </footer>
        </div>
    )
}
