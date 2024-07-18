// 토큰 디코딩
function decodeToken(token: string) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
 
	return JSON.parse(jsonPayload);
}

// 토큰 만료시간 확인
function isTokenExpiringSoon(token: string) {
	const decoded = decodeToken(token);
	const exp = decoded.exp;
	const now = Math.floor(Date.now() / 1000);
	const remainingTime = exp - now;
	const threshold = 2 * 60; // 2분 (120초)
	return remainingTime <= threshold;
}
 

export { decodeToken, isTokenExpiringSoon };