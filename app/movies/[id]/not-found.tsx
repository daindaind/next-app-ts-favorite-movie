import { PAGE_URL } from '@/constants/router';
import Link from 'next/link';
import React from 'react';

function MovieDetailNotFound() {
	return (
		<div className='flex h-svh flex-1 justify-center items-center flex-col gap-3'>
			<p className='text-3xl'>🫥</p>
			<h3 className='font-light text-2xl'>요청하신 페이지를 찾을 수 없습니다.</h3>
			<Link href={`${PAGE_URL.BASE}`} className='mt-2'>
				<p className='underline font-semibold text-gray-05 hover:cursor-pointer hover:text-cherry-pink'>홈으로 이동하기</p>
			</Link>
		</div>
	);
}

export default MovieDetailNotFound;