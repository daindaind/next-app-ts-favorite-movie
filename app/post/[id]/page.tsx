import PostUpdate from '@/components/post/PostUpdate';
import { API_URL, PAGE_URL } from '@/constants/router';
import { PostType } from '@/types/data';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

async function update(formData: FormData) {
	'use server';
	const headersList = headers();
	const authorization = headersList.get('authorization');
	const headerPathname = headersList.get('x-pathname') || "";
	const id = headerPathname.split('/')[2];

	const postData = {
		latitude: formData.get('latitude'),
		longitude: formData.get('longitude'),
		color: formData.get('color'),
		address: formData.get('address'),
		title: formData.get('title'),
		description: formData.get('description'),
		date: formData.get('date'),
		score: formData.get('score'),
		imageUri: formData.get('imageUri'),
	};

	// presigned Url 발급
	let imageUri = '';
	if (postData?.imageUri && authorization) {
		const imageFormData = new FormData();
		imageFormData.append(`images`, postData?.imageUri);

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.IMAGE}`, {
				method: 'POST',
				headers: { 'Authorization': JSON.parse(authorization)["Authorization"] },
				body: imageFormData
			});
			
			if (res.ok) {
				const data = await res.json();
				imageUri = data[0];
				console.log('presigned url: ', data);
			}
		} catch (e) {
			console.error(e);
		}
	}

	// 데이터 수정 요청
	if (postData && authorization && imageUri) {
		console.log(JSON.stringify({
			latitude: String(postData.latitude),
			longitude: String(postData.longitude),
			color: String(postData.color),
			address: String(postData.address),
			title: String(postData.title),
			description: String(postData.description),
			date: String(postData.date),
			score: Number(postData.score),
			// imageUris: Array(imageUri),
			imageUris: []
		}));
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS}/${id}`, {
				method: 'PATCH',
				headers: JSON.parse(authorization),
				body: JSON.stringify({
					latitude: String(postData.latitude),
					longitude: String(postData.longitude),
					color: String(postData.color),
					address: String(postData.address),
					title: String(postData.title),
					description: String(postData.description),
					date: String(postData.date),
					score: Number(postData.score),
					// imageUris: Array(imageUri),
					imageUris: []
				})
			});
			console.log(res);
		} catch (e) {
			console.error(e);
		}
		// redirect는 try catch 문에 쓰면 안돼..
		redirect(`${PAGE_URL.MOVIES}`);
	}
}


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
		<form className="flex flex-col align-middle justify-center gap-7 p-7 pb-[100px]" action={update}>
			<PostUpdate data={data} />
		</form>
	);
}

export default PostUpdatePage;