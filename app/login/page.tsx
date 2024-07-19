import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { API_URL, PAGE_URL } from '@/constants/router';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

// TODO: 로그인 후 redirect 처리
async function create(formData: FormData) {
	'use server';
	const headersList = headers();
	const authorization = headersList.get('authorization');
	const cookieStore = cookies();

	const data = {
		email: formData.get('email'),
		password: formData.get('password'),
	};

	if (authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.LOGIN}`, {
				method: 'POST',
				headers: JSON.parse(authorization),
				body: JSON.stringify({
					email: String(data.email),
					password: String(data.password)
				})
			});
			console.log(res);
			const responseData = await res.json();
			const accessToken = responseData.accessToken;
			const refreshToken = responseData.refreshToken;
			cookieStore.set('accessToken', accessToken);
			cookieStore.set('refreshToken', refreshToken);

		} catch (e) {
			console.error('로그인 실패: ', e);
		}
	}

	redirect(`${PAGE_URL.BASE}`);
};

function LoginPage() {
	return (
		<form className='relative h-screen w-full' action={create}>
			<div className='flex flex-col items-center h-[50vh] bg-cherry-pink'>
				<h1 className='text-white font-semibold text-2xl mt-12'>로그인</h1>
				<h3 className='text-white font-light text-lg mt-1'>MOVIE에 로그인하고 취향을 공유하세요.</h3>

				<div className='absolute w-[80%] bg-white z-50 top-40 rounded-lg p-20 shadow-md max-w-[1056px]'>
					<div className="flex flex-col gap-3 w-full">
						<p className="text-gray-08 text-sm font-normal">이메일<span className='text-cherry-pink text-lg'>*</span></p>
						<Input
							name='email'
							placeholder="이메일을 입력해주세요."
						/>
					</div>
					<div className="flex flex-col gap-3 w-full mt-5">
						<p className="text-gray-08 text-sm font-normal">비밀번호<span className='text-cherry-pink text-lg'>*</span></p>
						<Input
							name='password'
							placeholder="비밀번호를 입력해주세요."
							type='password'
						/>
					</div>
					<div className='flex flex-row justify-center gap-3 mt-5'>
						<p className='self-center text-sm text-gray-700 mt-[2px]'>가입된 계정이 없으신가요?</p>
						<Link href={PAGE_URL.SINGUP}><span className='text-sm text-gray-700 font-semibold hover:text-cherry-pink underline'>회원가입 하러가기</span></Link>
					</div>
					<div className='flex flex-col w-full mt-10'>
						<Button label="로그인" type="submit" />
					</div>
				</div>
			</div>
		</form>
	);
}

export default LoginPage;