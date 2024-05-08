import Controller from "./Controller";

export default function Items() {
    return (
        <div>
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
            <main>
                <Controller
                    className="bg-red-500"
                />
            </main>
        </div>
    )
}
