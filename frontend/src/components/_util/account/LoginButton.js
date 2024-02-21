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
            </div>
        </>
    )
}

export default LoginButton