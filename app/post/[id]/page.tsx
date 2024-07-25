import PostUpdate from '@/components/post/PostUpdate';
import { API_URL } from '@/constants/router';
import { PostType } from '@/types/data';
import { headers } from 'next/headers';
import React from 'react';


interface PostUpdatePageProps {
  params: { id: number };
}

async function PostUpdatePage({params}: PostUpdatePageProps) {
	const id = params.id;
	const headersList = headers();
	const authorization = headersList.get('authorization');
	let data: PostType | null = null;

	if (authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS}/${id}`, {
				method: 'GET',
				headers: JSON.parse(authorization)
			});
        
			const responseData = await res.json();
			data = responseData;
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<>
			<PostUpdate authorization={authorization} data={data} id={id} />
		</>
	);
}

export default PostUpdatePage;