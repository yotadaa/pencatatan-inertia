import { useContext, useEffect, useState } from "react";
import { generateUniqueColors } from "../../assets/variables";
import Categories from "./Categories";
import OutboundToday from "./OutboundToday";
import Context from "../../provider/context";
import CashFlowToday from "./CashFlowToday";
import OutboundOverview from "./OutboundsOverview";
import InboundsOverview from "./InboundsOverview";
import axios from "axios";

export default function Dashboard({ props }) {

    const getItems = async (sort, inRange = 10, outRange = 10) => {
        try {
            const p = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios.post(route("get-items", {
                page: "null",
                entry: "all",
                category: 1,
                sort: 9,
                by: "asc",
                query: "*",
            }), {
                credential: null,
            }, p);
            const inbound = await axios.post(route('get-inbounds', { range: "all" }), {
                credential: null
            }, p);
            const outbound = await axios.post(route('get-outbounds', { range: "all" }), {
                credential: null
            }, p);
            if (response.data.success && inbound.data.success && outbound.data.success) {
                const value = Object.keys(response.data.value).map(o => response.data.value[o]);
                setItems({
                    items: value,
                    inbounds: Object.keys(inbound.data.value).map(o => inbound.data.value[o]),
                    outbounds: Object.keys(outbound.data.value).map(o => outbound.data.value[o]),
                });
                setCategories({
                    nama: response.data.category.map(o => o.nama),
                    count: response.data.category.map(o => o.nama).map((o, i) => {
                        if (groupByCategoryCount(response.data.value)[i]) {
                            return groupByCategoryCount(response.data.value)[i]
                        } else {
                            return 0
                        }
                    }),
                    color: generateUniqueColors(response.data.category.length)
                })
                setProcessing(false);
            } else {
                console.log("Gagal mengambil data");
            }
        } catch (e) {
            console.error(e)
        }
        setProcessing(false);
    }

    function groupByCategoryCount(objects) {
        return objects.reduce((acc, obj) => {
            const category = obj.kategori;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
    }

    const [items, setItems] = useState({
        items: [undefined],
        inbounds: [],
        outbounds: [],
    });

    const [categories, setCategories] = useState({
        nama: [],
        count: [],
        color: [],
    });
    const { windowSize, setProcessing, processing } = useContext(Context);

    const [shouldShrink, setShouldShrink] = useState(false);
    useEffect(() => {

        if (windowSize.w < 700) {
            setShouldShrink(true)
        } else {
            setShouldShrink(false)
        }
    }, [windowSize])

    useEffect(() => {
        setProcessing(true)
        if (items.items[0] === undefined) getItems(9, 10, 10);
    }, []);

    return (
        <div className="w-full style-3 pb-32">
            <header className="w-full">
                <h1
                    className="text-xl font-thin"
                    style={{
                        fontWeight: 500,
                        fontSize: 25,
                    }}
                >
                    Dashboard
                </h1>
                <h1
                    className="text-xl font-thin mt-5"
                    style={{
                        fontSize: 25,
                    }}
                >
                    Selamat Datang, <span className="font-semibold">Mukhtada</span>
                </h1>
            </header>
            <main className={`${shouldShrink ? 'flex-col' : 'flex-row'} flex w-full`}>
                <section className={`${shouldShrink ? 'w-full' : 'w-2/3'} p-0 py-3 flex flex-col gap-0 `}>
                    <section className="flex flex-col gap-0 justify-items-start md:flex-row md:gap-4 mb-0">
                        <OutboundToday windowSize={windowSize} widthToShrink={700} />
                        <CashFlowToday windowSize={windowSize} widthToShrink={700} />
                    </section>
                    <Categories setProcessing={setProcessing} categories={categories} windowSize={windowSize} items={items.items.slice(0, 10)} />
                </section>
                <section className={`${shouldShrink ? "w-full" : "w-1/3"} p-2 flex flex-col gap-3`}>
                    <OutboundOverview
                        categories={categories}
                        windowSize={windowSize}
                        outbounds={items.outbounds}
                        innerProcessing={processing}
                    />
                    <InboundsOverview
                        categories={categories}
                        windowSize={windowSize}
                        inbounds={items.inbounds}
                        innerProcessing={processing}
                    />
                </section>
            </main>
        </div>
    );
}
