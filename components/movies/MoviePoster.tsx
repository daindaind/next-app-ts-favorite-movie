'use client';

import { PostType } from '@/types/data';
import Image from 'next/image';
import React from 'react';

interface MoviePosterProps {
   movieData: PostType;
   onClick?: () => void;
}

function MoviePoster({movieData, onClick}: MoviePosterProps) {
	return (
		<div onClick={onClick} className='flex flex-col gap-1 transition-transform duration-300 ease hover:transition-transform hover:cursor-pointer hover:scale-95 transform-gpu'>
			<div className='w-[250px] h-[360px] relative bg-gray-01 rounded-md'>
				{movieData.images[0] && <Image alt="Poster" src={movieData.images[0].uri} className="bg-gray-08 rounded-md shadow-md" fill />}
			</div>
			<h5 className='flex mt-3 font-normal text-lg text-default-text'>{movieData?.title}</h5>
			<p className='flex font-extralight text-xs text-default-text'>{movieData?.date}</p>
		</div>
	);
}

export default MoviePoster;