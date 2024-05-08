
import { formatNumber } from "../../../assets/variables";
import CheckButton from "../CheckButton";

export default function Table({ categories, items, inbound = false }) {
    return (
        <section className="text-left flex flex-col ">
            {items.map((item, index) =>
                <div
                    key={index}
                    className={`flex items-center w-fit py-2 border-b-gray-400  hover:bg-gray-100`}
                >
                    <div
                        style={{
                            // backgroundColor: categories.color[item.kategori]
                        }}
                        className=" shadow-gray-300 text-sm rounded-md flex justify-start items-center hover:contrast-125  cursor-pointer font-medium contrast-75 w-full flex-nowrap style-3 gap-5 "
                    >
                        <div
                            style={{
                                backgroundColor: categories.color[item.kategori]
                            }}
                            className="shadow-md rounded-md px-2 w-[100px] "
                        >{categories.nama[item.kategori]}</div>
                        <div className=" w-[150px] text-left">{item.nama}</div>
                        <div className="w-[50px] text-center"><div className="text-center nowrap rounded-md px-2 w-fit "><span className="text-rose-700">{item.qty}</span>pcs</div></div>
                        <div className={`w-[150px] text-right shadow-md whitespace-nowrap ${inbound ? "bg-rose-300" : "bg-emerald-300"} rounded-md px-2 `}>Rp. {formatNumber(item.total)}</div>
                        <div className="w-[200px] text-right whitespace-nowrap rounded-md px-2 ">{item.created_at}</div>
                    </div>
                </div>
            )}
            <div
                style={{
                    // backgroundColor: categories.color[item.kategori]
                }}
                className=" shadow-gray-300 text-sm rounded-md flex justify-start items-center hover:contrast-125  cursor-pointer font-medium contrast-75 w-full flex-nowrap style-3 gap-5 mb-2"
            >

                <CheckButton>Lihat Lebih Banyak</CheckButton>
            </div>
        </section>
    );
}
