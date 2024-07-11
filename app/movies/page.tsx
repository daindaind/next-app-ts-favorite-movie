'use client'

import Button from "@/components/common/Button";
import { PAGE_URL } from "@/constants/router";
import { MovieType } from "@/types/data";
import React, { useEffect, useState } from "react";
import MoviePosterSlide from "@/components/movies/MoviePosterSlide";
import { useRouter } from "next/navigation";
import { fetchMovieData } from "@/api";

interface MoviesPageProps {
   data: MovieType[];
}

function MoviesPage({}: MoviesPageProps) {
   const [data, setData] = useState<MovieType[]>([]);
   const router = useRouter();

   useEffect(() => {
      (async () => {
         const fetchedData = await fetchMovieData();
         if (fetchedData) {
            setData(fetchedData)
         }
      })()
   }, []);

   return (
      <div className="flex flex-col justify-center h-screen">
         <h3 className="ml-6 mb-1 text-gray-08 font-light text-3xl">내가 가장 좋아하는 작품들</h3>
         <h5 className="flex mb-3 flex-wrap ml-6 text-gray-08 font-light text-xl">당신의 작품을 공유해주세요.</h5>
         <div className="ml-6 mb-20">
         <Button label="Post Your Movies" onClick={() => router.push(`${PAGE_URL.POST}`)}/>
         </div>
         <MoviePosterSlide movieData={data}/>
      </div>
   );
}

export default MoviesPage;