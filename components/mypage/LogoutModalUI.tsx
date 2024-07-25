import React from 'react';
import Button from '../common/Button';
import { API_URL, PAGE_URL } from '@/constants/router';
import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';

interface LogoutModalUIProps {}

async function logout() {
	'use server';
	const headersList = headers();
	const authorization = headersList.get('authorization');

	if (authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.LOGOUT}`, {
				method: 'POST',
				headers: JSON.parse(authorization),
			});
			if (res) {
				cookies().delete('accessToken');
				cookies().delete('refreshToken');
			}
		} catch (e) {
			console.error(e);
		}
	}
	redirect(`${PAGE_URL.BASE}`);
}

const LogoutModalUI = ({}: LogoutModalUIProps) => {
	return (
		<form action={logout}>
			<dialog className='flex flex-col w-full justify-center items-center h-full rounded-sm border-none bg-transparent' open>
				<div className='flex flex-col items-center w-[300px] p-10 rounded-lg bg-white gap-5'>
					<p>정말 로그아웃 하시겠습니까?</p>
					<div className='flex flex-row gap-2'>
						<Button label='확인' type='submit' />
						<Button label='취소' />
					</div>
				</div>
			</dialog>
		</form>
	);
};

export default LogoutModalUI;