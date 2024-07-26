import ModalBackdrop from '@/components/post/ModalBackdrop';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

interface InterceptImagePageProps {
   params: { id: number, image: string }
}

function InterceptImagePage({params}: InterceptImagePageProps) {
	const imgUrl = params.image;


	if (!imgUrl) {
		notFound();
	}

	return (
		<ModalBackdrop isClose>
			<dialog className='flex flex-col justify-center items-center h-full rounded-sm border-none max-w-4xl bg-transparent' open>
				<div className='flex flex-col justify-center items-center bg-transparent shadow-md'>
					<Image alt='poster' src={`${process.env.NEXT_PUBLIC_API_URL}/${imgUrl}`} width={450} height={560} />
				</div>
			</dialog>
		</ModalBackdrop>
	);
}

export default InterceptImagePage;