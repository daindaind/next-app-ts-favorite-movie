import PostSearch from '@/components/search/PostSearch';
import { headers } from 'next/headers';
import React from 'react';

function SearchPage() {
	const headersList = headers();
	const authorization = headersList.get('authorization');

	return (
		<div className='flex flex-col p-16 gap-10'>
			<div className='flex flex-col gap-1 ml-2'>
				<h3 className="text-gray-08 font-light text-3xl">포스트 찾아보기</h3>
				<h5 className="flex flex-wrap text-gray-08 font-light text-xl">나와 비슷한 생각이 담긴 포스트를 찾아보세요.</h5>
			</div>

			<PostSearch authorization={authorization} />
		</div>
	);
}

export default SearchPage;