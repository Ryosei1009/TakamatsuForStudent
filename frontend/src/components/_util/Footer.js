import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const Footer = () => {
    const {isAuthenticated} = useAuth0();
    return (
        <>
            <footer className="flex justify-center items-center bg-opacity-40 bg-white dark:bg-dark-nav flex-col pt-3 pb-2 text-black dark:text-dark">
                <div>©️2024 Ryosei1009</div>
                {isAuthenticated && (
                    <a className="hover:underline text-blue-500 cursor-pointer" href="/fromdev/">Website運営から</a>
                )}
            </footer>
        </>
    )
}

export default Footer