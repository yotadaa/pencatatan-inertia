import ReactApexChart from "react-apexcharts";
import Container from "../other/Container";
import { useState } from "react";
import NumberCounter from './NumberCounter'
import CheckButton from "./CheckButton";
import { motion } from "framer-motion";
import { Tooltip, Zoom } from "@mui/material";



export default function Categories({ categories, windowSize, items }) {

    function sortArrays(array1, array2) {
        const combinedArray = array1.map((value, index) => ({ value1: value, value2: array2[index] }));

        combinedArray.sort((a, b) => b.value2 - a.value2);

        const sortedArray1 = combinedArray.map(item => item.value1);
        const sortedArray2 = combinedArray.map(item => item.value2);

        return [sortedArray1, sortedArray2];
    }

    const [kategori, jumlah] = sortArrays(categories.nama, categories.count);
    const [itemHover, setItemHover] = useState(-1);
    const counter = [0, 1, 2, 3, 4]

    const [chartProps, setChartProps] = useState({
        option: {
            chart: {
                type: 'donut',
                width: 300,
                event: {
                    click: function (val) {
                        console.log(val);
                    }
                },
                redrawOnWindowResize: true,
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 100
                    },
                    legend: {
                        position: 'bottom'
                    },
                    event: {
                        click: function (val) {
                            console.log(val);
                        }
                    }
                }
            }],
            plotOptions: {
                bar: {
                    event: {
                        click: function (val) {
                            console.log(val);
                        }
                    }
                }
            },
            fill: {
                type: 'gradient',
            },
            stroke: {
                width: 1
            },
            colors: categories.color,
            labels: kategori,
            tooltip: {
                enabled: true,
                labels: {
                    formatter: function (val) {
                        return val + "pcs";
                    }
                },
                formatter: function (val) {
                    return val + "pcs";
                },
                dropShadow: {
                    show: true,
                }
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                show: false,
            },
            legend: {
                show: false,
            }
        }
    });



    return (

        <div className="bg-gray-50 rounded-md shadow-md border-gray-400 border overflow-y-hidden ">
            <section className="relative overflow-x-auto style-3 mr-0 overflow-y-hidden">
                <section className="p-2 min-w-[500px]">
                    <main className="flex w-full h-full gap-1"
                        style={{
                            zIndex: 3,
                        }}
                    >
                        <section className="relative min-w-[300px]  min-h-[300px]">
                            <div
                                className="bg-transparent absolute left-0 top-0 flex-col h-full flex justify-center items-center w-full min-w-[300px]"
                            >
                                <ReactApexChart
                                    options={chartProps.option}
                                    series={jumlah}
                                    type="donut"
                                    width="300"
                                    className=""
                                />
                            </div>
                            <div id='this' className="bg-transparent absolute left-0 top-0 w-full flex-col h-full flex justify-center items-center" style={{ pointerEvents: 'none' }}>
                                <section className="text-6xl text-emerald-600 drop-shadow-md font-bold">
                                    <NumberCounter to={jumlah.reduce((a, b) => a + b, 0)} decimalPlaces={0} />
                                </section>
                                <section className="font-medium text-xl text-emerald-600">
                                    Item
                                </section>
                            </div>
                        </section>
                        <section className="p-1 w-full bg-transparent">
                            <section className="text-3xl">
                                <span className="font-semibold">{categories.nama.length}</span> <span className="font-light">Kategori</span>
                            </section>
                            <section className="mt-3 font-semibold ">
                                {/* Kategori Top     */}
                            </section>
                            <section className="flex flex-col gap-2 w-full">
                                <div className="flex flex-wrap gap-2 w-full">
                                    {kategori.map((item, index) =>
                                        <div
                                            key={index}
                                            className="flex gap-1 justify-between items-center hover:contrat-125"
                                            onMouseEnter={() => setItemHover(index)}
                                            onMouseLeave={() => setItemHover(-1)}
                                        >
                                            <Tooltip disableFocusListener disableTouchListener TransitionComponent={Zoom} title="Click for more">
                                                <div
                                                    style={{
                                                        backgroundColor: categories.color[index]
                                                    }}
                                                    className="shadow-md text-sm p-1 rounded-md flex justify-between items-center hover:contrast-125 cursor-pointer font-medium contrast-75 gap-2"
                                                >
                                                    <span>{item}</span>
                                                    <span className="bg-white shadow-sm px-1 rounded-md">{jumlah[index]}</span>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>

                                <CheckButton
                                    onClick={() => {
                                        console.log("Clicked")
                                    }}
                                ><div className="py-1">Lebih Lanjut</div></CheckButton>
                            </section>
                        </section>
                    </main>
                </section>
            </section >
        </div>
    );
}
