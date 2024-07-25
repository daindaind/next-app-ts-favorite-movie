'use client';

import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import { API_URL, PAGE_URL } from '@/constants/router';
import { useRouter } from 'next/navigation';

interface PostMenuButtonProps {
   authorization: any;
   id: number;
}

function PostMenuButton({ authorization, id }: PostMenuButtonProps) {
	const router = useRouter();
	// 게시글 삭제
	const handleDelete = async () => {
		console.log('delete');
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS}/${id}`, {
				method: 'DELETE',
				headers: authorization
			});

			console.log('반환값: ', res);
			alert('삭제되었습니다.');
			router.back();
		} catch (e) {
			console.error(e);
		}
	};

	// TODO: 수정 페이지로 이동
	const handleUpdate = () => {
		console.log('update');
		router.push(`${PAGE_URL.POST}/${id}`);
	};

	return (
		<div className="flex flex-row items-start gap-3 ml-auto">
			<button onClick={handleDelete}>
				<RiDeleteBin6Line size={20} className='hover:text-cherry-pink'/>
			</button>
			<button onClick={handleUpdate} className='hover:text-cherry-pink'>
				<FaPencil size={17} />
			</button>
		</div>
	);
}

export default PostMenuButton;