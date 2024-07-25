import React from "react";
import { headers } from "next/headers";
import { API_URL, PAGE_URL } from "@/constants/router";
import { redirect } from "next/navigation";
import PostUI from "@/components/post/PostUI";

// TODO: post 이후 다른 페이지로 이동
async function create(formData: FormData) {
	'use server';
	const headersList = headers();
	const authorization = headersList.get('authorization');

	const postData = {
		latitude: formData.get('latitude'),
		longitude: formData.get('longitude'),
		color: formData.get('color'),
		address: formData.get('address'),
		title: formData.get('title'),
		description: formData.get('description'),
		date: formData.get('date'),
		score: formData.get('score'),
		imageUris: formData.get('imageUrls'),
	};

	if (postData && authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS}`, {
				method: 'POST',
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
					imageUris: [],  // TODO: 실제 url 리스트 필요
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

function PostPage() {
	return (
		<form className="flex flex-col items-center justify-center gap-7 p-7" action={create} >
			<PostUI />
		</form>
	);
}

export default PostPage;
