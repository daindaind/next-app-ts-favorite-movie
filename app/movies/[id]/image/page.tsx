import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

interface ImagePageProps {
   params: {id: number}
}

function ImagePage({params}: ImagePageProps) {
   const postId = params.id;
   console.log(postId);
   // postId로 데이터 요청해서 이미지 보여줄 수 있도록
   const testImage = "https://i.namu.wiki/i/X3p1gFytDLQBIyBYzZ6QWca_0DOi9hu2cMQRPlT0ZizZxWtwOAhS_8cE6C2LRU42hJdqIHe_PSGuvJaCoMZckw.webp";

   console.log('일반 페이지');

   if (!testImage) {
		notFound();
   }

  return (
      <div className='flex flex-col justify-center items-center h-screen shadow-md'>
         <Image alt='poster' src={testImage} width={550} height={660} />
      </div>
  )
}

export default ImagePage