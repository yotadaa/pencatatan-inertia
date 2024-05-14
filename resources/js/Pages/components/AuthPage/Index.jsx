import React, { useEffect, useState } from "react";
import registerBackground from '../../assets/register_background.png';
import Context from "../../provider/context";
import { useContext } from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister"
import AuthModal from "./AuthModal";


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


export default function RegisterPage({ mode, failed, message, url }) {
    const { windowSize, loginFailed, setLoginFailed, setProcessing } = useContext(Context);
    useState(() => {
        setProcessing(false);
    }, [])

    return (
        <div className="flex justify-center w-screen overflow-x-hidden h-screen bg-slate-200"
            style={{
                alignItems: windowSize.w > 550 ? 'center' : 'flex-start',
            }}
        >
            <AuthModal failed={loginFailed} />
            <div className="min-w-[400px] flex overflow-hidden rounded-md shadow-lg "
                style={{
                    flexDirection: windowSize.w > 550 ? 'row' : 'column',
                }}
            >
                {mode ? <FormRegister /> : <FormLogin failed={failed} message={message} setLoginFailed={setLoginFailed} loginFailed={loginFailed} url={url} />}
                <Images width={windowSize.w} />
            </div>
        </div>
    )
}

