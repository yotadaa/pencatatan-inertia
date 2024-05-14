import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import increaseIcon from '../../assets/increase.png'
import NumberCounter from './NumberCounter'
import CheckButton from '../other/CustomButton'


export default function CashFlowToday({ windowSize, widthToShrink }) {


    const initialState = {
        item: 12345678.9,
        percentage: 1234
    }
    const [count, setCount] = useState({
        item: 12345678.9,
        percentage: 1234
    })
    const counter = [0, 1, 2, 3, 4]

    return (
        <div className={`scrollbar style-3 relative rounded-md shadow-sm overflow-x-auto overflow-y-hidden max-h-[118px]  shadow-emerald-600 ${windowSize.w > widthToShrink ? "w-1/2" : "w-full"} mb-3 md:w-full`}
            onClick={() => {
                setCount(prev => ({
                    ...prev,
                    percentage: -prev.percentage,
                }))
            }}
            style={{
                width: '100%',
                // maxWidth: windowSize.w > widthToShrink ? 300 : "100%",
                backgroundColor: "#ECFDF5",
                marginLeft: 0,
            }}
        >
            <div className='flex flex-col p-2 w-full  bg-transparent'
                style={{
                    zIndex: -1,
                }}
            >
                <header className='text-emerald-600 font-bold'
                    style={{ zIndex: 3 }}
                >Cash Flow</header>
                <main className='h-full flex justify-center flex-col w-full bg-transparent'
                    style={{ zIndex: 3 }}
                >
                    <div className='font-bold text-emerald-600 flex items-center gap-2 w-full'>
                        <div>
                            <section className="text-xs font-normal">
                                Uang masuk hari ini,
                            </section>
                            <span className='md:text-xl text:3xl overflow-hidden text-clip'>Rp <NumberCounter from={0} to={count.item} /> </span>
                        </div>
                    </div>
                </main>
                <footer className='font-semibold text-md mt-1 text-emerald-600 w-full'
                    style={{ zIndex: 3 }}
                >
                    <span className={` ${count.percentage > 0 ? " text-emerald-600 bg-emerald-100 " : " text-rose-600 bg-rose-100 "} flex gap-2 items-center  px-1 rounded-lg font-medium text-sm py-1`}>
                        <motion.img src={increaseIcon}
                            style={{
                                width: 20,
                                transform: count.percentage > 0 ? 'scaleY(1)' : 'scaleY(-1)',
                            }}
                            animate={{
                                transform: count.percentage > 0 ? 'scaleY(1)' : 'scaleY(-1)',
                            }}
                        /> <span className='sm:text-xs'>Meningkat sebanyak</span><NumberCounter decimalPlaces={1} to={Math.round(count.percentage)} />%</span>
                </footer>
            </div>
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: 8,
                    zIndex: 3,
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
                className='h-full absolute left-0 top-0  bg-transparent w-full overflow-hidden'
                style={{
                    zIndex: 1
                }}
            >
                <div className='relative w-full h-full '>
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
                                backgroundColor: `rgba(255,255,255, 0.${(item + 1) * 1.5})`,
                                boxShadow: `-5px 0px 5px rgba(0,0,0, 0.00${item + 1})`,
                            }}
                        ></div>
                    )}
                </div>
            </div>
        </div >

    )
}
