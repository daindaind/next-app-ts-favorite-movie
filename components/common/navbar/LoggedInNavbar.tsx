'use client';

import { PAGE_URL } from '@/constants/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function LoggedInNavbar() {
	const currentPath = usePathname();

	return (
		<div className="flex flex-row justify-end align-middle flex-1 gap-4">
			<li>
				<Link href={PAGE_URL.BASE} className={currentPath === PAGE_URL.BASE ? 
					"font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>홈</Link>
			</li>
			<li>
				<Link href={PAGE_URL.SEARCH} className={currentPath === PAGE_URL.SEARCH ? 
					"font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>찾아보기</Link>
			</li>
			<li>
				<Link href={PAGE_URL.MOVIES} className={currentPath === PAGE_URL.MOVIES ? 
					"font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>나의 영화</Link>
			</li>
			<li>
				<Link href={PAGE_URL.POST} className={currentPath === PAGE_URL.POST ? "font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>포스팅</Link>
			</li>
			<li>
				<Link href={PAGE_URL.ME} className={currentPath === PAGE_URL.ME ? "font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>마이페이지</Link>
			</li>
		</div>
	);
}

export default LoggedInNavbar;