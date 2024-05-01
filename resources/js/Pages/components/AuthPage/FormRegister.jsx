import React, { useEffect, useState } from "react";
import registerBackground from '../../assets/register_background.png';
import Input from "./Input";
import { Button } from "@mui/material";
import Context from "../../provider/context";
import { useContext } from "react";
import FormLogin from "./FormLogin";
import { Link } from "react-router-dom";

const FormRegister = () => {
    const { windowSize } = useContext(Context);
    const [formProps, setFormProps] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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
                <section className="text-xs"
                    style={{
                        fontWeight: 'thin',
                    }}
                >Silahkan buat akun kamu terlebih dahulu!</section>
            </header>
            <main className="gap-y-[5px] flex flex-col">
                <Input
                    onChange={(e) => {
                        setFormProps(prevs => ({
                            ...prevs,
                            name: e.target.value
                        }))
                    }}
                    value={formProps.name}
                    placeholder='Nama'
                    labels='Nama'
                />

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

                <Input
                    onChange={(e) => {
                        setFormProps(prevs => ({
                            ...prevs,
                            confirmPassword: e.target.value
                        }))
                    }}
                    value={formProps.confirmPassword}
                    placeholder={'Confirm Password'}
                    labels='Confirm Password'
                    type='password'
                />

            </main>
            <footer className="flex w-full justify-start mt-5 flex-col">
                <Button variant="contained" disableElevation
                >
                    <span className="py-1 px-3">Daftar</span>
                </Button>
                <section className="text-sm mt-3">
                    Atau <Link to="/login" className="text-blue-700 font-semibold">Login menggunakan akun kamu</Link>
                </section>
            </footer>
        </form>
    );
};

const Images = ({ width }) => {
    return (
        <div
            className="h-[500px] p-10 min-w-[400px]"
            style={{
                width: width > 550 ? 500 : width + 10,
                backgroundImage: `url(${registerBackground})`,
                backgroundSize: 'cover'
            }}
        >
            <div className="text-yellow-300">
                <section className="poppins text-5xl"
                    style={{
                        fontWeight: 700,
                        textShadow: '2px 4px 5px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Pengelolaan Logistik Menjadi Lebih Mudah
                </section>
            </div>
            <div className="text-yellow-300 mt-3">
                <section className="poppins text-3xl"
                    style={{
                        fontWeight: 700,
                        textShadow: '2px 4px 5px rgba(0, 0, 0, 0.9)',
                    }}
                >
                    Buat akunmu sekarang!
                </section>
            </div>
        </div>
    )
}


export default function RegisterPage({ mode }) {
    const { windowSize } = useContext(Context);
    const [csrf, setCsrf] = useState('')

    useEffect(() => {
        console.log(mode)
    }, []);

    return (
        <div className="flex justify-center w-screen overflow-x-hidden h-screen bg-slate-200"
            style={{
                alignItems: windowSize.w > 550 ? 'center' : 'flex-start',
            }}
        >
            <div className="min-w-[400px] flex overflow-hidden rounded-md shadow-lg "
                style={{
                    flexDirection: windowSize.w > 550 ? 'row' : 'column',
                }}
            >
                {mode ? <FormRegister /> : <FormLogin />}
                <Images width={windowSize.w} />
            </div>
        </div>
    )
}

