import axios from "axios"
import { useState } from "react";
import Table from "./ItemListCompo/Table";
import InnerLoading from "../other/InnerLoading";



export default function InboundsOverview({ categories, windowSize }) {

    const getInbounds = async () => {
        try {
            const response = await axios.post(route('get-inbounds'), {
                credential: null
            }, {
                withCredentials: true, // For sending cookies along with the request
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                const value = Object.keys(response.data.value).map(o => response.data.value[o])
                setInbound(value);
                setInnerProcessing(false);
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
    const [inbound, setInbound] = useState([]);
    const [innerProcessing, setInnerProcessing] = useState(true)

    useState(() => {
        getInbounds();
    }, [])

    return (

        <section className={`max-h-[500px] overflow-y-auto style-3 relative p-2 bg-gray-50 rounded-md shadow-lg ${innerProcessing ? "pb-10" : ""}`}>
            <section className={`${windowSize.w > 900 ? "block" : 'block'} gap-2 w-full justify-between text-center overflow-x-scroll style-3`}>
                <section className={``}>
                    <header className="mb-2 w-[500px] flex items-center text-left text-rose-600 font-bold">
                        Recent Inbounds
                    </header>
                    <Table categories={categories} items={inbound.slice(0, 10)} inbound={true} />
                </section>
            </section>
            <InnerLoading processing={innerProcessing} />
        </section>
    )
}
