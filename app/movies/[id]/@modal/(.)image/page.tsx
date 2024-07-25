import ModalBackdrop from '@/components/post/ModalBackdrop';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

interface InterceptImagePageProps {
   params: { id: number }
}

function InterceptImagePage({params}: InterceptImagePageProps) {
	const postId = params.id;
	console.log(postId);
	// postId로 데이터 요청해서 이미지 보여줄 수 있도록
	const testImage = "https://i.namu.wiki/i/X3p1gFytDLQBIyBYzZ6QWca_0DOi9hu2cMQRPlT0ZizZxWtwOAhS_8cE6C2LRU42hJdqIHe_PSGuvJaCoMZckw.webp";

	console.log('모달 페이지');

	if (!testImage) {
		notFound();
	}

	return (
		<ModalBackdrop>
			<dialog className='flex flex-col justify-center items-center h-full rounded-sm border-none max-w-4xl bg-transparent' open>
				<div className='flex flex-col justify-center items-center bg-transparent shadow-md'>
					<Image alt='poster' src={testImage} width={450} height={560} />
				</div>
			</dialog>
		</ModalBackdrop>
	);
}

export default InterceptImagePage;