import { useState } from "react";
import DaftarKategori from "./DaftarKategori";
import CustomButton from "../other/CustomButton";
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import SettingsIcon from '@mui/icons-material/Settings';
import { Inertia } from "@inertiajs/inertia";

export default function Controller({
    style, className, kategori, colorList, categoryProps, setCategoryProps,
    page, entry, category, setInnerLoading, sort, setProcessing
}) {

    return (
        <div
            className={`relative  bg-gray-50 p-2 rounded-md ${className}`}
            style={{
                ...{
                },
                ...style
            }}
        >
            <header className="font-medium mb-3 flex items-center gap-2">
                <SettingsApplicationsIcon /> Pusat Kontrol
            </header>
            <main>
                <div className="flex gap-2">
                    <div className="">
                        <CustomButton className="py-2 bg-emerald-400 hover:contrast-75 hover:bg-emerald-400 select-none" Icon={AddIcon} >Tambah Barang</CustomButton>
                    </div>
                    <div className="">
                        <CustomButton
                            onClick={() => {
                                setProcessing(true);
                                Inertia.get(route('daftar-kategori'));
                            }}
                            className="py-2 gap-1 bg-amber-300 hover:bg-amber-200 select-none"
                            Icon={SettingsIcon}
                        >Edit Kategori</CustomButton>
                    </div>
                    <div className="relative">
                        <motion.div className="absolute flex gap-2  h-[40px] items-start pt-[5px] px-2 rounded-md shadow-md "
                            style={{
                                width: 180,
                                zIndex: 3,
                                backgroundColor: categoryProps.current !== "null" ? colorList[categoryProps.current] : "#E5E7EB",
                            }}
                            animate={{
                                backgroundColor: categoryProps.current !== "null" ? colorList[categoryProps.current] : "#E5E7EB",
                                height: categoryProps.swell ? 46 * 4 : 40,
                                maxHeight: 49 * 3,
                                width: categoryProps.swell ? 200 : 180,
                            }}
                        >
                            <div className="font-medium mt-[3px]">
                                Kategori
                            </div>
                            <DaftarKategori kategori={kategori} categoryProps={categoryProps} colorList={colorList} setCategoryProps={setCategoryProps}
                                page={page}
                                entry={entry}
                                category={category}
                                sort={sort}
                                setInnerLoading={setInnerLoading}
                            />
                        </motion.div>
                    </div>

                </div>
            </main>
        </div>
    )
}
