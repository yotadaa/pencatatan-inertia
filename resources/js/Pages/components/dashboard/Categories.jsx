import ReactApexChart from "react-apexcharts";
import Container from "../other/Container";
import { useState } from "react";



export default function Categories({ categories }) {

    const [chartProps, setChartProps] = useState({
        options: {
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                    }
                }
            },
            colors: categories.color,
            plotOptions: {
                bar: {
                    columnWidth: '30%',
                    distributed: true,
                    borderTopRadius: 10,

                }
            },
            dataLabels: {
                enabled: false,
            },
            nd: {
                show: false
            },
            xaxis: {
                categories: categories.nama,
                labels: {
                    style: {
                        colors: categories.color,
                        fontSize: '12px'
                    }
                }
            },
        }
    });


    return (
        <section className="w-full mt-3 h-[300px]">
            <Container>
                <section className="p-5 overflow-x-auto">
                    <section>
                        <h1 className="font-medium text-xl">
                            Kategori
                        </h1>
                    </section>
                    <section className="flex w-full h-full`">
                        <section className="w-2/3">
                            <ReactApexChart
                                options={chartProps.options}
                                series={[{
                                    data: categories.count,
                                    name: "Jumlah"
                                }]}
                                type="bar"
                                height={300}
                            />
                        </section>
                        <section>
                        </section>
                    </section>
                </section>
            </Container>
        </section>
    );
}
