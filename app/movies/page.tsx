import Button from "@/components/common/Button";
import { API_URL, PAGE_URL } from "@/constants/router";
import React from "react";
import MoviePosterSlide from "@/components/movies/MoviePosterSlide";
import Link from "next/link";
import getHeaders from "@/utils/header";

interface MoviesPageProps {}

async function MoviesPage({}: MoviesPageProps) {
	const page = 1;
	const authorization = getHeaders();
	let movieData = [];

	// TODO: 페이지네이션 구현
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.MY_POSTS}?page=${page}`, {
			method: 'GET',
			headers: authorization,
		});
		movieData = await res.json();
	} catch (e) {
		console.error(e);
	}

	console.log(movieData);
   
	return (
		<div className="flex flex-col justify-center items-center mt-10 pb-[100px]">
			<h3 className="ml-6 mb-1 text-gray-08 font-light text-3xl">내가 가장 좋아하는 작품들</h3>
			<h5 className="flex mb-3 flex-wrap ml-6 text-gray-08 font-light text-xl">당신의 작품을 공유해주세요.</h5>
			<div className="ml-6 mb-20">
				<Link href={`${PAGE_URL.POST}`}>
					<Button label="Post Your Movies"/>
				</Link>
			</div>
			{movieData.length <= 0 && (
				<div className="flex flex-col gap-1 items-center">
					<p className="text-lg font-normal text-gray-01 ml-6">아직 작성한 포스팅이 없습니다.</p>
					<p className="text-lg font-normal text-gray-01 ml-6">위 버튼을 눌러 포스트를 작성해보세요!</p>	
				</div>
			)}
			<MoviePosterSlide movieData={movieData}/>
		</div>
	);
}

export default MoviesPage;