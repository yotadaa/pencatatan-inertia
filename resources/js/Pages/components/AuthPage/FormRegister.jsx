
import { InertiaLink } from "@inertiajs/inertia-react";
import Input from "./Input";
import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import Context from "../../provider/context";

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
                    Atau <InertiaLink href={route("login")} className="text-blue-700 font-semibold">Login menggunakan akun kamu</InertiaLink>
                </section>
            </footer>
        </form>
    );
};


export default FormRegister;
