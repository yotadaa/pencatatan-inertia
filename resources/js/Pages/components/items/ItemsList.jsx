
import InnerLoading from "../other/InnerLoading";
import CustomButton from "../other/CustomButton";
import SortIcon from '@mui/icons-material/Sort';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchItem from "./SearchItems";
import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import { formatNumber } from "../../assets/variables";

const SelectItem = ({ value, children }) => {
    return (
        <MenuItem sx={{
            fontSize: 10
        }} value={value}>{children}</MenuItem>
    )
}


export default function ItemsList({
    innerLoading, header, items, kategori, column, setColumn, colorList,
    by, setBy, page, entry, setInnerLoading, query, tableProps, setTableProps, total,
    setViewDetail, setItemDetail, propsTotal, totalItems
}) {

    const handlePageChange = (event, newPage) => {
        setTableProps(prevs => ({
            ...prevs,
            page: newPage
        }))
    }

    const handleChangeEntry = (event) => {
        setTableProps(prevs => ({
            ...prevs,
            entry: event.target.value + "",
            page: 1,
        }))
    }
    return (
        <section className="bg-gray-50 flex flex-col gap-2 p-2 shadow-md rounded-md w-full overflow-x-auto">
            <div className="flex gap-2 items-center">
                <div className="flex gap-2 items-center w-full">
                    <div className="text-sm">
                        <FormControl sx={{ minWidth: 80, }} size="small">
                            <InputLabel>Entry</InputLabel>
                            <Select
                                label="Entry"
                                onChange={handleChangeEntry}
                                value={tableProps.entry}
                                sx={{
                                    fontSize: 13
                                }}
                            >
                                <MenuItem sx={{ fontSize: 13 }} value={5}>5</MenuItem >
                                <MenuItem sx={{ fontSize: 13 }} value={10}>10</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value={15}>15</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value={20}>20</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value={"all"}>All</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="py-1">
                        <CustomButton
                            className="py-1 rounded-sm bg-blue-300 select-none hover:bg-blue-400"
                            Icon={SortIcon}
                            onClick={() => {
                                if (!innerLoading) setBy(by === "asc" ? "desc" : "asc")
                            }}
                        >{by}</CustomButton>
                    </div>
                    <div className="w-full flex text-[13px] font-medium">
                        Total {totalItems} barang di inventaris
                    </div>
                </div>
                <SearchItem
                    innerLoading={innerLoading}
                    page={page}
                    entry={entry}
                    setInnerLoading={setInnerLoading}
                    query={query}
                />
            </div>
            <table className="w-full min-w-[600px]">
                <thead className="w-full text-sm">
                    <tr className="w-full">
                        <th
                            className={`border border-gray-500 py-1 hover:bg-gray-100 cursor-pointer`}
                        ></th>
                        {header.map((item, index) =>
                            <th
                                key={index}
                                onClick={() => {
                                    if (!innerLoading) {
                                        setColumn(item.id)
                                    } else {
                                    }
                                }}
                                className={`px-1 border border-gray-500 py-1 hover:bg-gray-100 cursor-pointer ${column === item.id ? "bg-gray-100" : ""}`}
                            >
                                {item.nama}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className={`relative text-center items-center  w-full ${innerLoading ? "" : ""}`}
                >
                    {items[0] === undefined ?
                        <tr className={`justify-center items-center ${innerLoading ? "h-[100px]" : ""}`}>
                            <td colspan="8">{items.length === 0 ? 'Data tidak ada' : 'Mencari Data'}</td>
                        </tr>
                        :
                        items.map((item, index) => {
                            if (item !== undefined) return (
                                <tr
                                    key={index}
                                    className="odd:bg-gray-200 text-sm "
                                >
                                    <td>
                                        <div className="flex gap-1">
                                            <CustomButton Icon={SettingsIcon} className="py-1 bg-yellow-300 hover:bg-yellow-200 scale-[80%]" />
                                            <CustomButton
                                                className="py-1 bg-gray-600 text-white hover:bg-gray-400 scale-[90%]"
                                                Icon={InfoOutlinedIcon}
                                                onClick={() => {
                                                    setViewDetail(true);
                                                    setItemDetail(item);
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td className="text-center">{item.kode}</td>
                                    <td className="text-left max-w-52">{item.nama}</td>
                                    <td className="text-left max-w-52">{item.desk}</td>
                                    <td>{item.stok}</td>
                                    <td className="text-right pr-3 font-medium ">{formatNumber(item.harga_awal)}</td>
                                    <td className="text-right pr-3 font-medium">{formatNumber(item.harga_jual)}</td>
                                    <td
                                        className="p-1"
                                    >
                                        <section
                                            style={{
                                                backgroundColor: colorList[item.kategori],
                                            }}
                                            className="m-0 px-1 py-1 rounded-sm shadow-md"
                                        >{kategori[item.kategori].nama}</section>
                                    </td>
                                </tr>
                            )
                        }
                        )
                    }
                    <InnerLoading processing={innerLoading} />
                </tbody>
            </table>
            <div className="flex w-full justify-end mt-2 items-center">
                <Pagination
                    count={parseInt(propsTotal)}
                    variant="outlined"
                    shape="rounded"
                    page={tableProps.page}
                    onChange={handlePageChange}
                />
            </div>
        </section>
    )
}
