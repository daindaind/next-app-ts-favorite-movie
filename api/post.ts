import { API_URL } from "@/constants/router";
import { headers } from "next/headers";

interface PostProps {
   latitude: string;
   longitude: string;
   color: string;
   address: string;
   title: string;
   description: string;
   date: string;
   score: number;
   imageUris: string[];
}

interface GetPostByDateProps {
   year: string;
   month: string;
}

// async function postArticle({...postData}: PostProps) {
//    console.log(header)

//    const res = await fetch(`http://localhost:3000/${API_URL.POSTS}`, {
//       method: 'POST',
//       headers: header,
//       body: JSON.stringify({
//          ...postData
//       })
//    });
//    return res;
// }

// // get 요청
// async function getPostDetail(id: number) {
//    const res = await fetch(`http://localhost:3000/${API_URL.POSTS}?id=${id}`, {
//       method: 'GET',
//       headers: header,
//    });
//    return res;
// }

// async function getMyPosts(page: number) {
//    const res = await fetch(`http://localhost:3000/${API_URL.POSTS}?page=${page}`, {
//       method: 'GET',
//       headers: header,
//    });
//    console.log(res);
//    return res;
// }

// async function getPostsByDate({year, month}: GetPostByDateProps) {
//    const res = await fetch(`http://localhost:3000/${API_URL.POSTS}?year=${year}&month=${month}`, {
//       method: 'GET',
//       headers: header,
//    });
//    return res;
// }

// async function searchPosts() {
//    const res = await fetch(`http://localhost:3000/${API_URL.POSTS_SEARCH}`, {
//       method: 'GET',
//       headers: header,
//    });
//    return res;
// }

// async function deletePost() {
//    const res = await fetch(`http://localhost:3000/${API_URL.POSTS}`, {
//       method: 'DELETE',
//       headers: header
//    });
//    return res;
// }

// async function updatePost() {
//    const res = await fetch(`http://localhost:3000/${API_URL.POSTS}`, {
//       method: 'PATCH',
//       headers: header,
//    });
//    return res;
// }

// export { postArticle, getPostsByDate, getPostDetail, getMyPosts, searchPosts, deletePost, updatePost };