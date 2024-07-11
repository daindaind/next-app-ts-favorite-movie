import { API_URL } from "@/constants/router";
import { MovieType } from "@/types/data";

async function fetchMovieData(): Promise<MovieType[]>{
   const res = await fetch(`http://localhost:4000${API_URL.PRODUCTS}`);
   if (!res.ok) {
      throw new Error('데이터 패칭 실패');
   }

   return res.json();
}

async function fetchMovieDetail({id}: {id: number}): Promise<MovieType> {
   const res = await fetch(`http://localhost:4000${API_URL.PRODUCTS}/${id}`);
   if (!res.ok) {
      throw new Error('데이터 패칭 실패');
   }

   return res.json();
}

export { fetchMovieData, fetchMovieDetail }