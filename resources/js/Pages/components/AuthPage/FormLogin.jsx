

import { useContext, useState } from "react";
import Context from "../../provider/context";
import Input from "./Input";
import { Button } from "@mui/material";
import { InertiaLink } from "@inertiajs/inertia-react";



export default function FormLogin() {
    const { windowSize } = useContext(Context);

    const [formProps, setFormProps] = useState({
        email: '',
        password: '',
    });


    return (
        <form className="bg-gray-50 p-5 px-16 flex flex-col justify-center min-w-[400px]"
            style={{
                width: windowSize.w > 550 ? 400 : windowSize.w,
            }}
        >

            <header
                className="text-2xl"
                style={{
                    fontFamily: '"Poppins", sans-serif',
                }}
            >
                <section
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: 600,
                    }}
                >
                    Lets start
                </section>
                <section className="text-sm"
                    style={{
                        fontWeight: 'thin',
                    }}
                >Silahkan login menggunakan akun kamu!</section>
            </header>
            <main className="gap-y-[5px] flex flex-col">

                <Input
                    onChange={(e) => {
                        setFormProps(prevs => ({
                            ...prevs,
                            email: e.target.value
                        }))
                    }}
                    value={formProps.email}
                    placeholder={'Alamat Email'}
                    labels='Alamat Email'
                />

                <Input
                    onChange={(e) => {
                        setFormProps(prevs => ({
                            ...prevs,
                            password: e.target.value
                        }))
                    }}
                    value={formProps.password}
                    placeholder={'Password'}
                    labels='Password'
                    type='password'
                />

            </main>
            <footer className="flex flex-col w-full justify-start mt-5">
                <Button variant="contained" disableElevation
                >
                    <span className="py-1 px-3">Login</span>
                </Button>
                <section className="text-sm mt-3">
                    Belum punya akun? <InertiaLink href={route("register")} className="text-blue-700 font-semibold" >Daftar sekarang</InertiaLink>
                </section>
            </footer>
        </form>
    );
}
