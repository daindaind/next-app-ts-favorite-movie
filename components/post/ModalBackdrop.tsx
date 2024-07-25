'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface ModalBackdropProps {
   children: React.ReactNode;
   isClose?: boolean;
}

function ModalBackdrop({children, isClose}: ModalBackdropProps) {
	const router = useRouter();

	return (
		<div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70' onClick={() => isClose ? router.back() : {}}>
			{children}   
		</div>
	);
}

export default ModalBackdrop;