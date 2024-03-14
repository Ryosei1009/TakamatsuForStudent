import React from 'react'

const Header = ({ toggleUpload }) => {
    return (
        <div className="flex items-center justify-around mt-10">
            <p className="text-6xl max-md:text-4xl font-bold">News</p>
            <button onClick={toggleUpload} className="text-xl max-md:text-base font-bold text-white px-4 py-2 rounded-xl border-2 bg-green-500 hover:bg-green-700">ニュースを作成</button>
        </div>
    )
}

export default Header