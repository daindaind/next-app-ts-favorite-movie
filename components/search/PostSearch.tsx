'use client';

import { API_URL } from '@/constants/router';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useDebouceEffect from '@/hooks/useDebounceEffect';

interface PostSearchProps {
   authorization: any;
}

function PostSearch({authorization}: PostSearchProps) {
	const [search, setSearch] = useState('');
	const page = 1;

	const fetchPosts = async () => {
		if (search.trim() === '' && !authorization) return;

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS_SEARCH}?query=${search}&page=${page}`, {
				method: 'GET',
				headers: {
					...authorization,
				}
			});

			const data = await res.json();
			console.log('Received response', data);
			// handle the response as needed
		} catch (e) {
			console.error(e);
			// handle the error as needed
		}
	};

	// TODO: 검색 기능 구현 및 API 연결
	useDebouceEffect(() => {
		fetchPosts();
	}, 500, [search]);

	return (
		<div className='flex flex-row gap-4 items-center'>
			<input 
				className='w-full bg-stone-100 p-5 rounded-full text-lg font-light focus:outline-none'
				placeholder='검색어를 입력하세요.'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button className='flex flex-col justify-center items-center hover:bg-stone-50 hover:cursor-pointer rounded-full w-[50px] h-[50px]'>
				<FaSearch size={40} className='p-[5px] text-stone-600 '/>
			</button>
		</div>
	);
}

export default PostSearch;