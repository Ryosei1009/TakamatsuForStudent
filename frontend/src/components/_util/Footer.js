import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Footer = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <>
            <footer className="flex justify-center items-center bg-opacity-40 bg-white dark:bg-dark-nav flex-col pt-3 pb-2 text-black dark:text-dark">
                <div>
                    {"©️2024 "}
                    <a className="hover:underline cursor-pointer" href="https://github.com/Ryosei1009" target="_blank" rel="noreferrer">Ryosei1009</a>
                </div>
                <div className="gap-4 flex">
                    <a className="hover:underline text-blue-500 cursor-pointer" href="/fromdev/userpolicy">利用規約</a>
                    <a className="hover:underline text-blue-500 cursor-pointer" href="/fromdev/privacypolicy">プライバシーポリシー</a>
                    {isAuthenticated && (
                        <>
                            <a className="hover:underline text-blue-500 cursor-pointer" href="/fromdev/">運営から</a>
                        </>
                    )}
                </div>
            </footer>
        </>
    )
}

export default Footer