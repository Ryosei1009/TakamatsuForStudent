import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <>
            <div className="flex justify-center items-center flex-col mt-20 mb-24">
                <div className="text-3xl max-md:text-xl font-bold">
                    <button className="px-14 py-5 font-bold text-5xl bg-indigo-600 hover:bg-indigo-700 rounded-2xl text-white" onClick={() => loginWithRedirect()}>
                        Login
                    </button>
                </div>
                <div className="mt-6">
                    ※ ログインした時点で
                    <a className="hover:underline text-blue-500 cursor-pointer" href="/fromdev/userpolicy">本利用規約</a>
                    に同意したものとみなされます。
                </div>
            </div>
        </>
    )
}

export default LoginButton