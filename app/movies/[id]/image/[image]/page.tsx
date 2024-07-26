import Image from 'next/image';
import React from 'react';

interface ImagePageProps {
   params: {id: number, image: string}
}

async function ImagePage({params}: ImagePageProps) {
	const imgUrl = params.image;

	return (
		<div className='flex flex-col justify-center items-center h-screen shadow-md'>
			<Image alt='poster' src={`${process.env.NEXT_PUBLIC_API_URL}/${imgUrl}`} width={550} height={660} />
		</div>
	);
}

export default ImagePage;