import React from 'react'
import othersjson from './Others.json'

const SelfIntroduction = () => {
  return (
    <div className="mx-72 max-2xl:mx-36 max-xl:mx-18 max-lg:mx-8 max-sm:mx-4 my-16">
      {othersjson.slice().map((item) => (
        <a href={item.url} key={item.id}>
          <div class="bg-violet-200 rounded-3xl px-12 max-sm:px-4 py-12 max-sm:py-8 mb-16 hover:opacity-70">
            <div class="text-5xl max-sm:text-3xl font-bold">
              {item.title}
            </div>
            <div class="flex max-md:flex-col items-center justify-around mt-8">
              <div class="max-md:w-full w-1/2">
                <img src={`/images/home/${item.image}`} alt="" class="w-full rounded-lg" />
              </div>
              <div class="max-md:w-full w-1/2 font-bold text-3xl max-xl:text-2xl max-lg:text-xl max-sm:text-lg ml-6 max-md:ml-0 border-l-4 max-md:border-l-0 border-black pl-6 max-md:px-3 max-md:mt-3 max-md:border-t-4 max-md:pt-2">
                {item.text1}
                <br />
                {item.text2}
                <br />
                {item.text3}
                <br />
                {item.text4}
              </div>
            </div>
          </div>
        </a>
      ))}

    </div>
  )
}

export default SelfIntroduction