import { NextRequest, NextResponse } from "next/server";
import { PAGE_URL } from "./constants/router";

function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('accessToken')?.value;
	const pathUrl = request.nextUrl.pathname;

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-pathname', request.nextUrl.pathname);

	// accessToken 유무에 따른 로그인 상태 전달
	if (accessToken) {
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

	// 로그인되어있는 상태면 home으로 redirect
	if (accessToken && pathUrl.startsWith(`${PAGE_URL.LOGIN}`)) {
		return NextResponse.redirect(new URL(`${PAGE_URL.BASE}`, request.url));
	}

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		}
	});

	// TODO: 로그인이 되어있는데 다른 페이지에 접근하려고 할 때 (마이페이지 등)

	// TODO: 리프레시 토큰 처리하기
}

export default middleware;