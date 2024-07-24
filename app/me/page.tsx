import Button from '@/components/common/Button';
import { API_URL, PAGE_URL } from '@/constants/router';
import { USER_DTO } from '@/types/dto';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import profile from "/public/images/profile.jpg"

async function MyPage() {
	const headersList = headers();
	const authorization = headersList.get('authorization');
	let userData: USER_DTO | null = null;

	if (authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.ME}`, {
				method: 'GET',
				headers: JSON.parse(authorization),
			});

			const data = await res.json();
			userData = data;
			console.log('반환값', data);
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div className='flex flex-col h-screen p-20 gap-16'>
			<div className='flex flex-row gap-5 items-center'>
				<div className='relative w-[100px] h-[100px]'>
					<Image alt='profileImg' fill src={userData?.imageUri ? userData?.imageUri : profile} className='rounded-full absolute object-cover border'/>
				</div>
				<h3 className='text-xl font-semibold text-gray-07'>{userData?.nickname || '아직 닉네임을 설정하지 않았어요.'}</h3>
				<Link href={`${PAGE_URL.ME_EDIT}`}>
					<Button label='수정하기' />
				</Link>
			</div>
			<div className='grid grid-cols-2 gap-16'>
				<div className='flex flex-col gap-2'>
					<h2 className='text-sm text-gray-05'>이메일</h2>
					<p className='text-lg font-light text-gray-08'>{userData?.email}</p>
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='text-sm text-gray-05'>유저 아이디</h2>
					<p className='text-lg font-light text-gray-08'>{userData?.id}</p>
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='text-sm text-gray-05'>가입일</h2>
					<p className='text-lg font-light text-gray-08'>{userData?.createdAt}</p>
				</div>
				<div className='flex flex-col gap-2'>
					<h2 className='text-sm text-gray-05'>로그인 타입</h2>
					<p className='text-lg font-light text-gray-08'>{userData?.loginType}</p>
				</div>
			</div>
			<div className='flex flex-col gap-5 items-start'>
				<Link href={`${PAGE_URL.REVOKE}`}>
					<h2 className='text-lg font-semibold text-gray08'>
						탈퇴하기
					</h2>
				</Link>
				<Link href={`${PAGE_URL.LOGOUT}`}>
					<h2 className='text-lg font-semibold text-gray08'>
						로그아웃
					</h2>
				</Link>
			</div>
		</div>
	);
}

export default MyPage;