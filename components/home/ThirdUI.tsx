'use client';

import React, { useRef } from 'react';
import PostCard from './PostCard';
import useIntersectionObsever from '@/hooks/useIntersectionObsever';
import { MovieType } from '@/types/data';

interface ThirdUIProps {
   data: MovieType[];
}

function ThirdUI({data}: ThirdUIProps) {
	const ref = useRef(null);
	const isInViewport = useIntersectionObsever(ref);
	return (
		<div className={isInViewport ? 'flex flex-col justify-center items-center mb-[100px] animate-slideUp' : ''} ref={ref}>
			<h1 className='text-5xl font-bold text-default-text z-[100] '>인기 게시글</h1>
			<h3 className='text-xl font-medium text-default-text mt-3 mb-20 z-[100]'>모두의 취향이 담긴 소개를 읽어보세요</h3>
      
			<div className='grid grid-cols-2 gap-5'>
				{data.slice(7, 11).map((data, index) => (
					<PostCard key={index} movieData={data}/>
				))}
			</div>
		</div>
	);
}

export default ThirdUI;