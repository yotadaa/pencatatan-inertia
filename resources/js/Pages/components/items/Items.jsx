import { useContext, useEffect, useState } from "react";
import Controller from "./Controller";
import { generateUniqueColors } from "../../assets/variables";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import ItemsList from "./ItemsList";
import Context from "../../provider/context";

export default function Items({ props }) {

    const { setProcessing, setItemDetail, itemDetail, viewDetail, setViewDetail } = useContext(Context);
    const [beginInitiation, setBeginInitiation] = useState(false);

    const getItems = async (page, entry, category, sort, by, query) => {
        setInnerLoading(true)
        try {
            const response = await axios.post(route("get-items",
                {
                    page: page,
                    entry: entry,
                    category: category,
                    sort: sort,
                    by: by,
                    query: query

                }), {
                credential: null,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                const value = Object.keys(response.data.value).map(o => response.data.value[o]);
                setItems(value);
                setInnerLoading(false);
                setProcessing(false);
                setTotal(response.data.total);
                setTableProps(prevs => ({
                    ...prevs,
                    total: Math.ceil(response.data.total / parseInt(prevs.entry) || 1)
                }));

            } else {
                console.log("Gaggal mengambil data");
                setInnerLoading(false);
            }
        } catch (e) {
            console.error(e)
            setInnerLoading(false)
        } finally {
            setInnerLoading(false);
            setProcessing(false);
        }
        setInnerLoading(false);
    }

    const [items, setItems] = useState([undefined]);
    const [colorList, setColorList] = useState(generateUniqueColors(props.kategori.length));
    const [categoryProps, setCategoryProps] = useState({
        swell: false,
        current: props.category
    })
    const [innerLoading, setInnerLoading] = useState(false);
    const [column, setColumn] = useState(parseInt(props.sort));
    const [by, setBy] = useState(props.by);
    const [header, setHeader] = useState([
        {
            nama: "Kode", id: 9
        }, {
            nama: "Nama", id: 2
        }, {
            nama: "Deskripsi", id: 3
        }, {
            nama: "Stok", id: 5
        }, {
            nama: "Harga Inbound", id: 6
        }, {
            nama: "Harga Outbound", id: 7
        }, {
            nama: "Kategori", id: 4
        },
    ]);

    const [head, setHead] = useState(null);
    const [total, setTotal] = useState(0);
    const [tableProps, setTableProps] = useState({
        page: parseInt(props.page),
        entry: props.entry,
        total: props.total//total === 0 ? 1 : Math.ceil(total / parseInt(props.entry))
    })


    useEffect(() => {
        getItems(
            props.category || 1,
            props.entry || 10,
            props.page || "null",
            props.sort || "9",
            props.by || "asc",
            props.query || "*"
        );
        setBeginInitiation(true);
    }, [])

    useEffect(() => {
        if (categoryProps.current !== props.category) {
            setQuery('*');
            setTableProps(prevs => ({
                ...prevs,
                page: 1,
            }));

        }

    }, [categoryProps])

    const [query, setQuery] = useState(props.query || "*");



    useEffect(() => {
        if (
            parseInt(props.sort) !== column ||
            (by !== props.by) ||
            (categoryProps.current + "" !== props.category
                && (categoryProps.current !== props.category)) ||
            tableProps.page !== parseInt(props.page) ||
            tableProps.entry !== props.entry

        ) {
            setProcessing(true);
            setInnerLoading(true)
            Inertia.get(route("items-o", {
                page: tableProps.page || 1,
                entry: tableProps.entry || 10,
                category: categoryProps.current || "null",
                sort: column || 9,
                by: by || "asc",
                query: query
            }));
        }
    }, [column, by, categoryProps]);


    useEffect(() => {
        if (items.length < parseInt(props.entry)) {
            setItems([...items].reverse())
        }
    }, [by])

    useEffect(() => {
        if (head) {
            if (items.length < parseInt(props.entry)) {
                setItems([...items].sort((a, b) => {
                    let com = 0;
                    if (a[head[column]] < b[head[column]]) {
                        com = -1
                    } else if (a[head[column]] > b[head[column]]) {
                        com = 1
                    }
                    return by === "asc" ? com : -com;
                }))
            }
        }
    }, [column])

    useEffect(() => {
        if (head === null && items.length[0] !== undefined) {
            setHead(Object.keys(items[0]))
        }

        setTableProps(prevs => ({
            ...prevs,
            total: total === 0 ? 1 : Math.ceil(total / parseInt(props.entry)),
        }))
    }, [items])

    useEffect(() => {
        if (beginInitiation)
            Inertia.get(route('items-o',
                {
                    category: props.category || 1,
                    entry: tableProps.entry || 10,
                    page: tableProps.page,
                    sort: props.sort || "9",
                    by: props.by || "asc",
                    query: props.query || "*"
                },
                {
                    replace: true,
                    preserveState: true,
                    preserveScroll: true,
                    only: ['page', 'entry']
                }
            ));
    }, [tableProps.page, tableProps.entry]);

    useEffect(() => console.log('total: ', tableProps.total), [tableProps.total])

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
                    Daftar Barang
                </h1>
                <h1
                    className="text-sm font-thin mt-0"
                    style={{
                    }}
                >
                    Daftar lengkap barang kamu
                </h1>
            </header>
            <main className="flex flex-col gap-3 w-full">
                <Controller
                    kategori={Object.keys(props.kategori).map(o => props.kategori[o])}
                    items={items}
                    className="shadow-md"
                    colorList={colorList}
                    categoryProps={categoryProps}
                    setCategoryProps={setCategoryProps}
                    page={props.page}
                    entry={props.entry}
                    category={props.category}
                    sort={column}
                    setInnerLoading={setInnerLoading}
                    setProcessing={setProcessing}
                />
                <ItemsList
                    setItemDetail={setItemDetail}
                    setBy={setBy}
                    by={by}
                    innerLoading={innerLoading}
                    setInnerLoading={setInnerLoading}
                    items={items}
                    header={header}
                    kategori={props.kategori}
                    column={column}
                    setColumn={setColumn}
                    colorList={colorList}
                    page={props.page}
                    entry={props.entry}
                    query={props.query}
                    tableProps={tableProps}
                    setTableProps={setTableProps}
                    total={total}
                    setViewDetail={setViewDetail}
                    propsTotal={props.total}
                    totalItems={props.totalItems}
                />
            </main>
        </div>
    )
}
