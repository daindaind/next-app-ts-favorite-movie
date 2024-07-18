'use client'

import React, { useRef } from 'react'
import useIntersectionObserver from '@/hooks/useIntersectionObsever';
import { MovieType } from '@/types/data';
import HomeMoviePoster from './MoviePoster';

interface SecondUIProps {
   data: MovieType[];
}

function SecondUI({data}: SecondUIProps) {
   const ref = useRef(null);
   const isInViewport = useIntersectionObserver(ref);
  return (
    <div className='relative flex flex-col justify-center items-center' ref={ref}>
      <h1 className={isInViewport ? 'text-5xl font-bold text-default-text mt-20 z-[100px] animate-slideUp' : ""}>나만 알고 싶은 작품을 소개하기.</h1>
      <h3 className={isInViewport ? 'text-xl font-medium text-default-text mt-3 mb-20 z-[100] animate-slideUp': ""}>내가 좋아하는 영화/드라마를 다른 사람과 공유해보세요</h3>
      <div className='relative z-[100] mb-[300px]'>
         <HomeMoviePoster movieData={data[4]}/>
         <div className={isInViewport ? ' bg- absolute bottom-[250px] left-[-200px] z-[200] animate-slideUp' : '' }>
            <div className='relative bg-cherry-pink rounded-3xl p-5 w-[200] m-6 text-default-text text-base font-medium text-center shadow-md'>
               <p className='bg-cherry-pink text-light-white whitespace-pre-wrap font-normal'>이 영화에 대해 다른 사람과{"\n"}얘기하고 싶어 🤔</p>
            </div>
         </div>

         <div className={isInViewport ? 'bg-none absolute bottom-[100px] right-[-200px] z-[200] animate-slideUp' : ''}>
            <div className='relative bg-cherry-pink rounded-3xl p-5 w-[200] m-6 text-default-text text-base font-medium text-center shadow-md'>
               <p className='bg-cherry-pink text-light-white whitespace-pre-wrap font-normal'>내 취향을 공유하고 싶은데..</p>
            </div>
         </div>
         <div className={isInViewport ? 'absolute w-[300px] h-[300px] bg-cherry-pink rounded-[300px] top-[-100px] right-[-650px] animate-moveRightToLeft' : ''} />
         <div className={isInViewport ? 'absolute w-[30px] h-[30px] bg-cherry-pink rounded-[300px] top-[-250px] left-[-400px] animate-moveLeftToRight' : ''} />
      </div>
    </div>
  )
}

export default SecondUI