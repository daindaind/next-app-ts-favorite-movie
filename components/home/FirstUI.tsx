'use client'

import React from 'react'
import MoviePoster from '../movies/MoviePoster';
import { MovieType } from '@/types/data'

interface FirstUIProps {
   data: MovieType[];
}

function FirstUI({data}: FirstUIProps) {
  return (
    <div className='relative flex flex-col justify-center items-center overflow-hidden pb-[550px]'>
      <h1 className='text-5xl font-bold text-default-text mt-20 animate-slideDown'>모두의 <span className='text-5xl font-bold text-cherry-pink'>인생작</span> 전부 여기에서.</h1>
      <h3 className='text-xl font-medium text-default-text mt-3 animate-slideDown'>나만의 모든 영화, 드라마, 애니메이션</h3>
      <div className='flex flex-row gap-5 mt-20 w-[990px] h-[490px]'>
         <div className='flex justify-center items-center bg-white p-[30px] rounded-[20px] w-[970px] h-[470px] z-[300] mt-[30px] shadow-lg animate-slideUp'>
            <MoviePoster movieData={data[0]} onClick={() => {}} />
         </div>
         <div className='flex justify-center items-center bg-white p-[30px] rounded-[20px] w-[970px] h-[470px] z-[300] shadow-lg animate-slideUp'>
            <MoviePoster movieData={data[1]} onClick={() => {}} />
         </div>
         <div className='flex justify-center items-center bg-white p-[30px] rounded-[20px] w-[970px] h-[470px] mt-[30px] z-[300] shadow-lg animate-slideUp'>
            <MoviePoster movieData={data[2]} onClick={() => {}} />
         </div>
      </div>
      <div className='absolute top-[400px] flex flex-row w-full h-[800px] rounded-tl-[180px] rounded-tr-[180px] bg-gradient-to-b from-cherry-pink'/>
    </div>
  )
}

export default FirstUI