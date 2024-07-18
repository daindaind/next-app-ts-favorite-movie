import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { PAGE_URL } from '@/constants/router';
import Link from 'next/link';
import React from 'react';
import { redirect } from 'next/navigation';
import { signup } from '@/api/auth';

async function create(formData: FormData) {
	'use server';

	const data = {
		username: formData.get('username'),
		age: formData.get('age'),
		email: formData.get('email'),
		password: formData.get('password'),
	};

	try {
		const res = await signup({
			email: String(data.email),
			password: String(data.password)
		});
		if (res.status === 200) {
			redirect(`${PAGE_URL.LOGIN}`);
		}
	} catch (e) {
		console.error(e);
	}
};

function SignupPage() {
	return (
		<form className='relative h-screen w-full' action={create}>
			<div className='flex flex-col items-center h-[50vh] bg-cherry-pink'>
				<h1 className='text-white font-semibold text-2xl mt-12'>회원가입</h1>
				<h3 className='text-white font-light text-lg mt-1'>MOVIE에 가입하고 취향을 공유하세요.</h3>

				<div className='absolute w-[80%] bg-white z-50 top-40 rounded-lg p-20 shadow-md max-w-[1056px]'>
					<div className="flex flex-col gap-3 w-full">
						<p className="text-gray-08 text-sm font-normal">이름<span className='text-cherry-pink text-lg'>*</span></p>
						<Input
							name='username'
							placeholder="이름을 입력해주세요."
						/>
					</div>
					<div className="flex flex-col gap-3 w-full mt-5">
						<p className="text-gray-08 text-sm font-normal">나이<span className='text-cherry-pink text-lg'>*</span></p>
						<Input
							name='age'
							placeholder="나이를 입력해주세요."
						/>
					</div>
					<div className="flex flex-col gap-3 w-full mt-5">
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
							type='password'
							placeholder="비밀번호를 입력해주세요."
						/>
					</div>
					<div className='flex flex-row justify-center gap-3 mt-5'>
						<p className='self-center text-sm text-gray-700 mt-[2px]'>이미 계정이 있으신가요?</p>
						<Link href={PAGE_URL.LOGIN}><span className='text-sm text-gray-700 font-semibold hover:text-cherry-pink underline'>로그인 하러가기</span></Link>
					</div>
					<div className='flex flex-col w-full mt-10'>
						<Button label="회원가입" type="submit" />
					</div>
				</div>
			</div>
		</form>
	);
}

export default SignupPage;