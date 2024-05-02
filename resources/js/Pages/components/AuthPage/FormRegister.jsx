
import { InertiaLink } from "@inertiajs/inertia-react";
import Input from "./Input";
import { Button, CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Context from "../../provider/context";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia"

const FormRegister = () => {
    const [formProps, setFormProps] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { setLoginFailed, setProcessing, windowSize, setAuthFailedMessage, loginFailed } = useContext(Context);
    const [loading, setLoading] = useState(false);

    const AttemptRegister = async (e) => {
        e.preventDefault();
        if (formProps.password !== formProps.confirmPassword) {
            setAuthFailedMessage({
                title: "Terjadi Kesalahan",
                body: "Tolong konfirmasi password dengan benar!"
            })
            setLoginFailed(true);
        } else if (!formProps.name || !formProps.email || !formProps.password || !formProps.confirmPassword) {
            setLoginFailed(true);
            setAuthFailedMessage({
                title: "Terjadi Kesalahan",
                body: "Tolong isi semua input!"
            })
        } else if (!isValidEmail(formProps.email)) {
            setLoginFailed(true);
            setAuthFailedMessage({
                title: "Terjadi Kesalahan",
                body: "Isi email dengan benar!"
            })
        } else {
            setLoading(true);
            try {
                const response = await axios.post(route('register-attempt'), {
                    credential: formProps
                }, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                console.log(response.data);

                if (response.data.success) {
                    localStorage.setItem("saved-email", formProps.email);
                    Inertia.visit(route("login"));
                } else {
                    setLoginFailed(true);
                    setAuthFailedMessage({
                        title: "Terjadi Kesalahan",
                        body: response.data.message,
                    });
                }
            } catch (error) {
                console.error(error);
                setLoginFailed(true);
                setAuthFailedMessage({
                    title: "Terjadi Error",
                    body: "Terjadi error ketika membuat akun!",
                });
            } finally {
                setLoading(false);
            }
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    useEffect(() => {
        if (loginFailed && !isValidEmail) {
            setFormProps(prevs => ({
                ...prevs,
                email: "",
                password: "",
                confirmPassword: ""
            }))
        }
    }, [loginFailed])

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
            <footer className="flex flex-col w-full items-start mt-5">
                <Button disableElevation
                    display='flex'
                    alignitems='center'
                    justifycontent='center'
                    variant={loading ? "outlined" : "contained"}
                    onClick={AttemptRegister}
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
                    <span className="px-3 py-1">Daftar</span>
                </Button>
                <section className="text-sm mt-3">
                    Atau <InertiaLink
                        href={route("login")} className="text-blue-700 font-semibold"
                        onClick={() => {
                            setProcessing(true);
                        }}
                    > Login dengan akun kamu</InertiaLink>
                </section>
            </footer>
        </form>
    );
};


export default FormRegister;
