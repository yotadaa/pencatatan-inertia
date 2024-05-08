import { useContext, useEffect, useState } from "react";
import { generateUniqueColors } from "../../assets/variables";
import Categories from "./Categories";
import OutboundToday from "./OutboundToday";
import Context from "../../provider/context";
import CashFlowToday from "./CashFlowToday";
import OutboundOverview from "./OutboundsOverview";
import InboundsOverview from "./InboundsOverview";

export default function Dashboard({ props }) {

    function groupByCategoryCount(objects) {
        return objects.reduce((acc, obj) => {
            const category = obj.kategori;
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
    }

    const kategori = props.kategori;
    const items = props.items;
    const [categories, setCategories] = useState({
        nama: kategori.map(o => o.nama),
        count: kategori.map(o => o.nama).map((o, i) => {
            if (groupByCategoryCount(items)[i]) {
                return groupByCategoryCount(items)[i]
            } else {
                return 0
            }
        }),
        color: generateUniqueColors(kategori.map(o => o.nama).length)
    });
    const { windowSize } = useContext(Context);

    const [shouldShrink, setShouldShrink] = useState(false);
    useEffect(() => {
        if (windowSize.w < 700) {
            setShouldShrink(true)
        } else {
            setShouldShrink(false)
        }
        console.log(windowSize.w)
    }, [windowSize])

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
                <section className={`${shouldShrink ? 'w-full' : 'w-2/3'} p-0 py-3 flex flex-col gap-4`}>
                    {/* <section className={`${shouldShrink ? "flex flex-col gap-0 justify-items-start" : " flex gap-4 "} `}> */}
                    <section className="flex flex-col gap-0 justify-items-start md:flex-row md:gap-4">
                        <OutboundToday windowSize={windowSize} widthToShrink={700} />
                        <CashFlowToday windowSize={windowSize} widthToShrink={700} />
                    </section>
                    <Categories categories={categories} windowSize={windowSize} items={items.slice(0, 10)} />
                </section>
                <section className={`${shouldShrink ? "w-full" : "w-1/3"} p-2 flex flex-col gap-3`}>
                    <OutboundOverview categories={categories} windowSize={windowSize} />
                    <InboundsOverview categories={categories} windowSize={windowSize} />
                </section>
            </main>
        </div>
    );
}
