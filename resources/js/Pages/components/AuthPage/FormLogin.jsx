

import { useContext, useState } from "react";
import Context from "../../provider/context";
import Input from "./Input";
import { Button } from "@mui/material";
import { InertiaLink } from "@inertiajs/inertia-react";
import CircularProgress from '@mui/material/CircularProgress';
import { router } from '@inertiajs/react'
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

export default function FormLogin({ failed, message }) {
    const { windowSize, loginFailed, setLoginFailed } = useContext(Context);

    const [formProps, setFormProps] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);

    const AttemptLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(route('login-attempt'), {
                credential: formProps
            })

            if (response.data.success) {
                // window.location.href = route("index");
                Inertia.get('/');
            }

            setLoginFailed(!response.data.success);
        } catch (e) {
            console.error(e);
            console.log('gagal')
        } finally {
            setLoading(false);
        }

        setLoading(false);
    }

    return (
        <form
            onSubmit={(e) => {
                console.log('123')
            }}
            className="bg-gray-50 p-5 px-16 flex flex-col justify-center min-w-[400px]"
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
            <footer className="flex flex-col w-full items-start mt-5">
                <Button disableElevation
                    display='flex'
                    alignitems='center'
                    justifycontent='center'
                    variant={loading ? "outlined" : "contained"}
                    onClick={() => {
                        // setLoginFailed(!loginFailed);
                        setLoading(true);
                        AttemptLogin();
                    }}
                    disabled={loading}
                    type="submit"
                >
                    <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{
                            // color: loading ? "blue" : "white",
                            display: loading ? "block" : "none",
                        }}
                    />
                    <span className="px-3 py-1">Login</span>
                </Button>
                <section className="text-sm mt-3">
                    Belum punya akun? <InertiaLink href={route("register")} className="text-blue-700 font-semibold" >Daftar sekarang</InertiaLink>
                </section>
            </footer>
        </form>
    );
}
