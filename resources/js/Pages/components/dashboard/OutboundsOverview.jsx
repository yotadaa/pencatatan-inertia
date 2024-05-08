import axios from "axios"
import { useState } from "react";
import Table from "./ItemListCompo/Table";
import InnerLoading from "../other/InnerLoading";



export default function OutboundOverview({ categories, windowSize }) {

    const getOutbounds = async () => {
        try {
            const response = await axios.post(route('get-outbounds'), {
                credential: null
            }, {
                withCredentials: true, // For sending cookies along with the request
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                const value = Object.keys(response.data.value).map(o => response.data.value[o])
                setOutbound(value);
                setInnerProcessing(false);
                console.log(outbound)
            } else {
                console.log("Gagal mengambil data");
                return [];
            }
        } catch (e) {
            console.error(e);
        } finally {
            setInnerProcessing(false);
        }
    }
    const [outbound, setOutbound] = useState([]);
    const [innerProcessing, setInnerProcessing] = useState(true)

    useState(() => {
        getOutbounds();
    }, [])

    return (

        <section className={`relative p-2 bg-gray-50 rounded-md shadow-lg ${innerProcessing ? "pb-10" : ""}`}>
            <section className={`${windowSize.w > 900 ? "block" : 'block'} gap-2 w-full justify-between text-center overflow-x-scroll style-3`}>
                <section className={``}>
                    <header className="mb-2 w-[500px] flex items-center text-left text-emerald-600 font-bold">
                        Recent Outbounds
                    </header>
                    <Table categories={categories} items={outbound.slice(0, 10)} />
                </section>
            </section>
            <InnerLoading processing={innerProcessing} />
        </section>
    )
}
