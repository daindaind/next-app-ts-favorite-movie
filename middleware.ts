import { NextRequest, NextResponse } from "next/server";
import { API_URL, PAGE_URL } from "./constants/router";
import { isTokenExpiringSoon } from "./utils/token";

async function getNewAccessToken(refreshToken: string) {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.REFRESH}`, {
	  method: 'GET',
	  headers: {
		 'Content-Type': 'application/json',
		 'Authorization': `Bearer ${refreshToken}`
	  }
	});
 
	if (!response.ok) {
	  throw new Error('Failed to refresh access token');
	}
 
	const data = await response.json();
	return data;
};

// 로그인 되어 있어야 접근할 수 있는 페이지
const protectedRoutes = [`${PAGE_URL.MOVIES}`,
	`${PAGE_URL.ME}`,
	`${PAGE_URL.MOVIE_DETAIL}`, 
	`${PAGE_URL.SEARCH}`,
	`${PAGE_URL.POST}`
];
// 공개적인 페이지 (로그인 필요 X)
const publicRoutes = [`${PAGE_URL.LOGIN}`,
	`${PAGE_URL.SINGUP}`,
	`${PAGE_URL.BASE}`];

async function middleware(request: NextRequest) {
	const response = NextResponse.next();
	let accessToken = request.cookies.get('accessToken')?.value;
	const refreshToken = request.cookies.get('refreshToken')?.value;
	const pathUrl = request.nextUrl.pathname;

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-pathname', request.nextUrl.pathname);

	// accessToken 유무에 따른 로그인 상태 전달
	if (accessToken) {

		// accessToken이 만료되었을 때 리프레시 토큰 요청
		// 저장했던 refreshToken으로 새로운 accessToken 발급
		// 발급 받은 accessToken을 cookie에 저장
		if (isTokenExpiringSoon(accessToken) && refreshToken) {
			try {
			  const data = await getNewAccessToken(refreshToken);

			  console.log(data);

			  const newAccessToken = data.accessToken;
			  const newRefreshToken = data.refreshToken;
			  response.cookies.set('accessToken', newAccessToken);
			  response.cookies.set('refreshToken', newRefreshToken);

			  requestHeaders.set('authorization', `Bearer ${newAccessToken}`);
			  requestHeaders.set('x-logged-in', 'true');
			} catch (error) {
			  console.error('Failed to refresh access token:', error);
			  requestHeaders.set('x-logged-in', 'false');
				return NextResponse.redirect(new URL(`${PAGE_URL.BASE}`, request.url));
			}
		};

		const authObject = {
			'Content-Type': "application/json",
			'Authorization': `Bearer ${accessToken}`
		};
		requestHeaders.set('authorization', JSON.stringify(authObject));
		requestHeaders.set('x-logged-in', 'true');
	} else {
		const authObject = {
			'Content-Type': "application/json"
		};
		requestHeaders.set('authorization', JSON.stringify(authObject));
		requestHeaders.set('x-logged-in', 'false');
	}

	// 로그인되어있는 상태에서 login, signup으로 접근 시, home page로 redirect
	if (accessToken && (pathUrl.startsWith(`${PAGE_URL.LOGIN}`) || pathUrl.startsWith(`${PAGE_URL.SINGUP}`))) {
		console.log('로그인 됨');
		return NextResponse.redirect(new URL(`${PAGE_URL.BASE}`, request.url));
	}

	// 로그인 안 되어있는 상태에서 protectedRoutes로 접근 시, login page로 redirect
	if (!accessToken && (protectedRoutes.includes(pathUrl))) {
		return NextResponse.redirect(new URL(`${PAGE_URL.LOGIN}`, request.url));
	}

	// return NextResponse.next({
	// 	request: {
	// 		headers: requestHeaders,
	// 	}
	// });
	// response의 헤더를 업데이트한 후 반환
	const finalResponse = NextResponse.next();
	finalResponse.headers.set('authorization', requestHeaders.get('authorization'));
	finalResponse.headers.set('x-logged-in', requestHeaders.get('x-logged-in'));
	finalResponse.headers.set('x-pathname', requestHeaders.get('x-pathname'));

	return finalResponse;
}

export default middleware;