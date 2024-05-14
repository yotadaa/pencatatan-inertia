import React, { useContext, useState, useRef, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { motion } from "framer-motion";
import CheckButton from '../other/CustomButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import Context from '../../provider/context';
import { formatNumber } from '../../assets/variables';
// import { Box, Button, CircularProgress } from '@mui/material';

export default function ItemsOverlay({ }) {

    const imageRef = useRef(null);
    const elementRef = useRef(null);
    const isImageLoaded = imageRef.current?.complete;
    const [loaded, setLoaded] = useState(false);
    const { itemDetail, setItemDetail, viewDetail, setViewDetail } = useContext(Context);
    const [detailPos, setDetailPos] = useState({
        x: null,
        y: null,
        hover: false,
        hold: false,
        iX: null,
        iY: null,

    })

    useEffect(() => console.log("Loaded? : ", loaded), [loaded])
    useEffect(() => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            setDetailPos(prevs => ({
                ...prevs,
                iX: rect.left,
                iY: rect.top,
            }))
        }
    }, [elementRef]);

    useEffect(() => {
        // console.log(detailPos)

    }, [detailPos.x, detailPos.y])


    return (

        <div className='top-0 left-0 select-none fixed h-screen w-full  overflow-hidden flex justify-center items-center'
            style={{
                zIndex: 9999999,
                pointerEvents: viewDetail ? "fill" : 'none',
                left: 0,
            }}
            onMouseDown={(event) => {
                if (detailPos.hover) {
                    setDetailPos(prevs => ({
                        ...prevs,
                        hold: true
                    }))
                }


            }}
            onMouseMove={(e) => {
                if (detailPos.hold) {
                    const offsetX = e.clientX - detailPos.iX;
                    const offsetY = e.clientY - detailPos.iY;

                    setDetailPos(prevs => ({
                        ...prevs,
                        x: offsetX,
                        // y: offsetY,
                    }))
                }
            }}
            onMouseUp={() => {
                setDetailPos(prevs => ({
                    ...prevs,
                    hold: false,
                    x: null,
                    y: null,
                }))
            }}
        >
            <motion.div className=' absolute bg-gray-50 w-[500px] h-[500px] flex flex-col justify-between rounded-md shadow-2xl'
                ref={elementRef}
                style={{
                    pointerEvents: 'all',
                    top: detailPos.y ? detailPos.y : '-100%',
                    left: detailPos.x ? detailPos.x : '',
                }}
                animate={{
                    top: (viewDetail && detailPos.y) ? detailPos.y : (viewDetail && !detailPos.y ? '10%' : '-100%'),
                }}
            >
                <header
                    className='w-full bg-gray-100 rounded-t-md py-1 px-2 font-medium'

                    onMouseEnter={() => {
                        setDetailPos(prevs => ({
                            ...prevs,
                            hover: true
                        }))
                    }}
                    onMouseLeave={() => {
                        setDetailPos(prevs => ({
                            ...prevs,
                            hover: false
                        }))
                    }}
                >Detail Item</header>
                <main
                    className='w-full py-5 overflow-y-scroll style-3'
                >
                    <header className='text-center mb-3 text-md font-medium'>
                        {itemDetail?.nama}
                    </header>
                    <section className='w-full flex items-center justify-center'>
                        <img
                            ref={imageRef}
                            src={itemDetail !== null ? itemDetail.foto : ""}
                            alt={itemDetail !== null ? itemDetail.nama : ""}
                            width={150}
                            className='border border-gray-400 rounded-sm shadow-sm hover:shadow-lg cursor-pointer'
                            draggable={false}
                            onLoad={() => setLoaded(true)}
                        />
                    </section>
                    <section className='flex flex-col w-full p-5'>
                        <section className='w-full relative '>
                            <label className='absolute text-sm font-medium left-4 top-[-10px] drop-shadow-lg'>
                                Deskripsi
                            </label>
                            <div id='det-desc' className='w-full text-sm bg-gray-100 rounded-md p-3 border-[1px] border-gray-300'>
                                {itemDetail?.desk}
                            </div>
                        </section>
                        <section className='w-full mt-4 px-3'>
                            <div className='flex justify-between'>
                                <label className='text-sm'>Harga Inbound</label>
                                <label className='text-sm'>Harga Outbound</label>
                            </div>
                            <div className='flex justify-between font-semibold' >
                                <div className='text-amber-600'>Rp. {formatNumber(itemDetail?.harga_awal)}</div>
                                <div className='text-emerald-600'>Rp. {formatNumber(itemDetail?.harga_jual)}</div>
                            </div>
                        </section>
                        <section className='w-full relative mt-4'>
                            <label className='absolute text-sm font-medium left-4 top-[-10px] drop-shadow-lg'>
                                Stok
                            </label>
                            <div id='det-desc' className='w-full text-sm bg-gray-100 rounded-md p-3 border-[1px] border-gray-300'>
                                {itemDetail?.stok} <span className='font-semibold'>{itemDetail?.stok > 1 ? "pcs" : "pc"}</span>
                            </div>
                        </section>
                    </section>
                </main>
                <section className='w-full px-5'>
                    <section className='w-full border-t-[1px] border-gray-400'></section>
                </section>
                <footer
                    className='w-full flex gap-2 justify-end items-center p-3'
                >
                    <CheckButton
                        className='bg-red-600 text-gray-50 py-1 text-sm flex items-center gap-1 '
                        Icon={DeleteIcon}
                    >
                        Hapus
                    </CheckButton>
                    <CheckButton
                        className='bg-yellow-400 text-gray-900 py-1 text-sm flex items-center gap-1 '
                        Icon={SettingsIcon}
                    >
                        Kontrol
                    </CheckButton>
                    <CheckButton
                        className='bg-gray-700 text-gray-50 py-1 text-sm flex items-center gap-1 '
                        Icon={CancelIcon}
                        onClick={() => {
                            setViewDetail(false);
                            setLoaded(false);
                        }}
                    >
                        Tutup
                    </CheckButton>
                </footer>
            </motion.div>
        </div>
    )
}
