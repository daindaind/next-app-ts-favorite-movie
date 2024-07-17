const PAGE_URL = {
  BASE: "/",
  MOVIES: "/movies",
  MOVIE_DETAIL: `/movies/detail`,
  POST: "/post",
  LOGIN: '/login',
  SINGUP: '/signup',
  ME: '/me'
};

const BASE_URL = {
  AUTH: 'auth'
}
 
 const API_URL = {
  PRODUCTS: 'products',

  // auth
  LOGIN: `${BASE_URL.AUTH}/signin`,
  SINGUP: `${BASE_URL.AUTH}/signup`,
  REFRESH: `${BASE_URL.AUTH}/refresh`,
  ME: `${BASE_URL.AUTH}/me`,
  LOGOUT: `${BASE_URL.AUTH}/logout`,
  CATEGOTY: `${BASE_URL.AUTH}/category`
}
 
 export { PAGE_URL, API_URL };