
import { motion } from 'framer-motion';
import { Inertia } from "@inertiajs/inertia";
import { useEffect } from 'react';

export default function DaftarKategori(
    { kategori, categoryProps, colorList, setCategoryProps, page, entry, setInnerLoading, sort
    }) {


    const handleCategoryClick = (cat) => {
        setInnerLoading(true)
        Inertia.get(route("items-o", { page: page, entry: entry, category: cat, sort: sort }));
    }



    return (
        <div className={`relative overflow-y-scroll overflow-x-hidden  style-3 flex items-center hover:${categoryProps.swell ? "" : "w-[100px]"} w-[100px] select-none`}
            onClick={() => {
                setCategoryProps(prevs => ({
                    ...prevs,
                    swell: !prevs.swell,
                }))
            }}
            style={{
                height: categoryProps.swell ? 46 * 3 : 40,
                width: 200
            }}
        >
            {kategori.map((item, index) =>
                <motion.div
                    key={index}
                    style={{
                        backgroundColor: colorList[index],
                        top: categoryProps.swell && index !== parseInt(categoryProps.current) ? (index + 1) * 35 : (index === parseInt(categoryProps.current) ? 0 : 0),
                        zIndex: 3,
                    }}
                    animate={{
                        top: categoryProps.swell && index !== parseInt(categoryProps.current) ? (index + 1) * 35 : (index === parseInt(categoryProps.current) ? 0 : 0),
                        zIndex: parseInt(categoryProps.current) === index ? 4 : 3,
                    }}
                    onClick={() => {

                        if (categoryProps.swell && parseInt(categoryProps.current) !== index) {
                            setCategoryProps(prevs => ({
                                ...prevs,
                                current: index + "",
                            }));
                        }
                    }}
                    className="absolute w-[100px] h-[30px] flex items-center justify-center rounded-sm  text-center font-medium hover:contrast-125"
                >{item.nama}
                </motion.div>
            )}
            <motion.div
                style={{
                    top: parseInt(categoryProps.current) === "null" ? 0 : (categoryProps.swell ? (parseInt(categoryProps.current) + 1) * 35 : 0),
                    zIndex: 3
                }}
                animate={{
                    top: parseInt(categoryProps.current) === "null" ? 0 : (categoryProps.swell ? (parseInt(categoryProps.current) + 1) * 35 : 0),
                    zIndex: 3
                }}
                className="absolute w-[100px] h-[30px] flex items-center justify-center rounded-sm text-center font-medium bg-gray-200 hover:contrast-125 "
                onClick={() => {

                    if (categoryProps.swell && parseInt(categoryProps.current) !== "null") {
                        setCategoryProps(prevs => ({
                            ...prevs,
                            current: "null",
                        }));
                    }
                }}
            >
                Semua
            </motion.div>
        </div>
    )
}
