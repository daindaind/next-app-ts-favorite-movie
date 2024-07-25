import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import UserEdit from '@/components/mypage/UserEdit';
import { API_URL, PAGE_URL } from '@/constants/router';
import { headers } from 'next/headers';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react';

async function create(formData: FormData) {
	'use server';
	const headersList = headers();
	const authorization = headersList.get('authorization');

	const body = {
		nickname: formData.get('nickname'),
		imageUri: formData.get('imageUri')
	};

	// TODO: resigned url 처리
   
	if (body && authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.ME}`, {
				method: 'PATCH',
				headers: JSON.parse(authorization),
				body: JSON.stringify({
					nickname: String(body.nickname),
					imageUri: '/'
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