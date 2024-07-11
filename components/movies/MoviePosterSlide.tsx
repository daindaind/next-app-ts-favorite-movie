'use client'

import React from 'react'
import MoviePoster from './MoviePoster'
import { PAGE_URL } from '@/constants/router';
import { MovieType } from '@/types/data';
import { useRouter } from 'next/navigation';

interface MoviePosterSlide {
  movieData: MovieType[];
}

function MoviePosterSlide({movieData}: MoviePosterSlide) {
  const router = useRouter();
  return (
    <div className='flex flex-col animate-slideUp'>
      <div className='flex flex-row pb-5 ml-6 overflow-x-scroll overflow-y-visible'>
         {movieData.map((movie, index) => (
            <div key={index} className='mt-1 mr-1 mb-1 ml-0 pl-1 flex-shrink-0'>
               <MoviePoster movieData={movie} onClick={() => router.push(`${PAGE_URL.MOVIES}/${movie.id}`)}/>
            </div>
         ))}
      </div>
    </div>
  )
}

export default MoviePosterSlide