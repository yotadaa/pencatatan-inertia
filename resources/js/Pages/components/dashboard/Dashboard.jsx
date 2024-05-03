import { useContext, useEffect, useState } from "react";
import { generateUniqueColors } from "../../assets/variables";
import Categories from "./Categories";
import OutboundToday from "./OutboundToday";
import Context from "../../provider/context";

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
        if (windowSize.w < 600) {
            setShouldShrink(true)
        } else {
            setShouldShrink(false)
        }
        console.log(windowSize.w)
    }, [windowSize])

    return (
        <div className="w-full">
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
                <section
                    className="text-base font-normal"
                    style={{
                        fontWeight: 300
                    }}
                >
                    Review barang kamu
                </section>
            </header>
            <main className={`${shouldShrink ? 'block' : 'flex'} w-full`}>
                <section className={`${shouldShrink ? 'w-full' : 'w-2/3'} p-3`}>
                    <OutboundToday />
                    <Categories categories={categories} />
                </section>
                <section className="w-1/3">
                </section>
            </main>
        </div>
    );
}
