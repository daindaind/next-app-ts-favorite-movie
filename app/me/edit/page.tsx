import UserEdit from '@/components/mypage/UserEdit';
import { API_URL, PAGE_URL } from '@/constants/router';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

async function create(formData: FormData) {
	'use server';
	const headersList = headers();
	const authorization = headersList.get('authorization');
	let imageUri = '';

	const body = {
		nickname: formData.get('nickname'),
		imageUri: formData.get('imageUri')
	};

	if (body?.imageUri && authorization) {
		const imageFormData = new FormData();
		imageFormData.append(`images`, body?.imageUri);

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

	if (body && authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.ME}`, {
				method: 'PATCH',
				headers: JSON.parse(authorization),
				body: JSON.stringify({
					nickname: String(body.nickname),
					imageUri: imageUri
				}),
			});
			console.log(res);
		} catch (e) {
			console.error(e);
		}
	}
	redirect(`${PAGE_URL.ME}`);
}

async function UserEditPage() {
	return (
		<form className='h-screen flex flex-col justify-center gap-10 p-20' action={create}>
			<UserEdit />
		</form>
	);
}

export default UserEditPage;