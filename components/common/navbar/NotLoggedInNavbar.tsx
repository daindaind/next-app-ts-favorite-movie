'use client';

import { PAGE_URL } from '@/constants/router';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

function NotLoggedInNavbar() {
	const currentPath = usePathname();

	return (
		<div className="flex flex-row justify-end align-middle flex-1 gap-4">
			<li>
				<Link href={PAGE_URL.LOGIN} className={currentPath === PAGE_URL.LOGIN ? 
					"font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>로그인</Link>
			</li>
			<li>
   
				<Link href={PAGE_URL.SINGUP} className={currentPath === PAGE_URL.SINGUP ? 
					"font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>회원가입</Link>
			</li>
			<li>
				<Link href={PAGE_URL.BASE} className={currentPath === PAGE_URL.BASE ? 
					"font-bold text-cherry-pink no-underline" : "flex font-medium text-default-text no-underline"}>홈</Link>
			</li>
		</div>
	);
}

export default NotLoggedInNavbar;