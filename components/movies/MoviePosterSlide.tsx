'use client';

import React from 'react';
import MoviePoster from './MoviePoster';
import { PAGE_URL } from '@/constants/router';
import { PostType } from '@/types/data';
import { useRouter } from 'next/navigation';

interface MoviePosterSlide {
  movieData: PostType[];
}

function MoviePosterSlide({movieData}: MoviePosterSlide) {
	const router = useRouter();
	return (
		<div className='flex flex-col items-center animate-slideUp w-full'>
			<div className='grid grid-cols-3 gap-3 w-[80% pb-5 ml-6 '>
				{movieData?.map((movie, index) => (
					<div key={index} className='flex flex-col justify-center items-center mt-1 mr-1 mb-1 ml-0 pl-1 flex-shrink-0'>
						<MoviePoster movieData={movie} onClick={() => router.push(`${PAGE_URL.MOVIES}/${movie.id}`)}/>
					</div>
				))}
			</div>
		</div>
	);
}

export default MoviePosterSlide;