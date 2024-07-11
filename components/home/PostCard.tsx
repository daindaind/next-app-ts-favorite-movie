import { MovieType } from '@/types/data'
import Image from 'next/image'
import React from 'react'

interface PostCardProps {
   movieData: MovieType
}

function PostCard({movieData}: PostCardProps) {
  return (
    <div className='relative flex flex-col gap-5 shadow-lg hover:transition-transform hover:cursor-pointer hover:scale-95 transform-gpu'>
      <div className='w-[250px] h-[360px] relative'>
        <Image alt="Poster" src={movieData.image} className="rounded-xl" fill />
      </div>
      <div className='absolute top-0 bottom-0 left-0 right-0 w-[250px] h-[360px] opacity-90 rounded-xl bg-gradient-to-t from-black'></div>
      <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center p-7 text-white text-sm font-light'>
         <p>Create By.</p>
         <p className='font-normal text-base mt-1 mb-12'>{movieData.creator}</p>
         <p>{movieData.summary}</p>
      </div>
    </div>
  )
}

export default PostCard