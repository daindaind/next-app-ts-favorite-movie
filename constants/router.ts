const PAGE_URL = {
	BASE: "/",
	MOVIES: "/movies",
	MOVIE_DETAIL: `/movies/detail`,
	POST: "/post",
	LOGIN: '/login',
	SINGUP: '/signup',
	ME: '/me',
	SEARCH: '/search',
	ME_EDIT: '/me/edit',
	LOGOUT: '/me/logout',
	REVOKE: '/me/revoke'
};

const BASE_URL = {
	AUTH: 'auth',
	MARKERS: 'markers',
	POSTS: 'posts',
	IMAGE: 'image'
};
 
const API_URL = {
	PRODUCTS: 'products',

	// auth
	LOGIN: `${BASE_URL.AUTH}/signin`,
	SINGUP: `${BASE_URL.AUTH}/signup`,
	REFRESH: `${BASE_URL.AUTH}/refresh`,
	ME: `${BASE_URL.AUTH}/me`,
	LOGOUT: `${BASE_URL.AUTH}/logout`,
	CATEGOTY: `${BASE_URL.AUTH}/category`,

	// posts
	GET_MARKERS: `${BASE_URL.MARKERS}/my`,
	MY_POSTS: `${BASE_URL.POSTS}/my`,
	POSTS: `${BASE_URL.POSTS}`,
	POSTS_SEARCH: `${BASE_URL.POSTS}/my/search`,

	// image
	IMAGE: `${BASE_URL.IMAGE}`,
};
 
export { PAGE_URL, API_URL };