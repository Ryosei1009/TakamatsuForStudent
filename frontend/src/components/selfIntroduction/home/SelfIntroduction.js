import React from 'react'
import FetchSelfIntroduction from './FetchSelfIntroduction'

const SelfIntroduction = () => {
  return (
    <>
        <div className="flex items-center justify-around mt-10">
            <p className="text-6xl font-bold">自己紹介</p>
        </div>
        <div>
            <FetchSelfIntroduction />
        </div>
    </>
  )
}

export default SelfIntroduction