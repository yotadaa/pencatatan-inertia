import SearchIcon from '@mui/icons-material/Search';
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from 'react';

export default function SearchItem({ page, entry, setInnerLoading, query }) {

    const handleSearchSubmit = () => {
        if (searchQuery !== query) {
            setInnerLoading(true);
            Inertia.get(route("items-o", {
                page: page || 1,
                entry: entry || 10,
                category: "*",
                sort: 2,
                by: "asc",
                query: searchQuery
            }));

        }
    }

    const resetSearchSubmit = () => {
        if (query !== '*') {
            setInnerLoading(true);
            Inertia.get(route("items-o", {
                page: page || 1,
                entry: entry || 10,
                category: "*",
                sort: 2,
                by: "asc",
                query: searchQuery
            }));

        }
    }

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div
            className="text-[14px] font-medium  rounded-sm w-full flex items-center justify-end gap-1"
        >

            <input
                className="placholder:text-xs border-[1px] border-gray-500 font-normal py-1 px-1 focus:outline-none  shadow-sm outline-none rounded-sm"
                placeholder="cari barang"
                onChange={(e) => {
                    setSearchQuery(e.target.value)
                }}
                value={searchQuery}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchSubmit();
                    }
                }}
            />
            <div
                className='w-[60px] text-center bg-blue-300 px-2 py-1 rounded-sm hover:bg-blue-400 cursor-pointer'

                onClick={() => {
                    if (searchQuery.length > 0) {
                        handleSearchSubmit();
                    }
                }}
            >
                Cari
            </div>
            <div
                className='w-[60px] text-center bg-rose-400 px-2 py-1 rounded-sm hover:bg-blue-400 cursor-pointer'

                onClick={() => {
                    resetSearchSubmit();
                }}
            >
                Reset
            </div>
        </div>
    )
}
