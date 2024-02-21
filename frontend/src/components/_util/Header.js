import React from 'react'
import HeaderRight from './HeaderRight';

const Header = () => {

    return (
        <>
            <header className="flex bg-opacity-40 bg-white dark:bg-dark-nav justify-around items-center h-16 w-full text-black dark:text-dark duration-300">
                <nav className="">
                    <ul className="flex items-center">
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/" className="block text-center hover:opacity-40 duration-300">
                                <img src="/images/logo/logo.png" alt="" className="w-11 max-sm:w-10" />
                            </a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/news/" className="text-xl max-sm:text-lg font-bold hover:opacity-40">News</a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/event/" className="text-xl max-sm:text-lg font-bold hover:opacity-40">Event</a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/photos/" className="text-xl max-sm:text-lg font-bold hover:opacity-40">Photos</a>
                        </li>
                        <li className="list-none inline-block mr-5 max-sm:mr-2">
                            <a href="/selfintroduction/" className="text-xl max-sm:text-lg font-bold hover:opacity-40">Self-Introduction</a>
                        </li>
                    </ul>
                </nav>
                <div className="flex items-center">
                    <HeaderRight />
                </div>
            </header>
        </>
    )
}

export default Header