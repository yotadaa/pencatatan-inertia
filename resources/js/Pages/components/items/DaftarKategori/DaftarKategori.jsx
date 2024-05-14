
import { Inertia } from '@inertiajs/inertia';
import { useContext, useEffect } from 'react';
import Context from '../../../provider/context';

export default function DaftarKategori() {

    const { setProcessing } = useContext(Context);

    const handleChangePage = () => {
        setProcessing(true)
        Inertia.get(route('items'))
    }

    useEffect(() => setProcessing(false), []);

    return (
        <div>
            <header>
                <section className="text-2xl  mb-1 font-medium">Daftar Kategori</section>
                <section
                    className=" flex items-center gap-1 text-sm font-medium"
                >
                    <span
                        onClick={() => {
                            handleChangePage();
                        }}
                        className="shadow-md bg-gray-100 px-2 rounded-3xl hover:bg-yellow-200 cursor-pointer"

                    >Items</span>
                    {'/'}
                    <span
                        className="shadow-md bg-gray-100 px-2 rounded-3xl "

                    >Daftar Kategori</span>
                </section>

            </header>
        </div>
    )
}
