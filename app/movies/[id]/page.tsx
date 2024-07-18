import { API_URL } from "@/constants/router";
import { PostType } from "@/types/data";
import getColors from "@/utils/getColors";
import getHeaders from "@/utils/header";
import Image from "next/image";

interface MovieDetailPageProps {
  params: {id: number}
}

async function MovieDetailPage({params}: MovieDetailPageProps) {
	const { id } = params;
	const authorization = getHeaders();
	let data: PostType = {};  // TODO: 타입에러 잡기

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS}/${id}`, {
			method: 'GET',
			headers: authorization
		});
		data = await res.json();
		console.log('받은 값: ', data);
	} catch (e) {
		console.error(e);
	}

	const movieColor = getColors(data.color);

	return (
		<div className="flex flex-col justify-center align-middle h-4/5 m-5 gap-10">
			<div className="flex flex-col self-center w-4/5">
				<div className="flex flex-row gap-5">
					{data.images[0] ? 
						<Image src={data.images[0].uri} width={250} height={360} alt="Poster" className="bg-gray-08 rounded-md shadow-md" /> 
						: <div className="w-[250px] h-[360px] bg-gray-01 rounded-md"></div>}
					<div className="flex flex-col gap-3">
						<p className=" inline-block text-2xl text-default-text font-bold p-1">{data.title}</p>
						<p className=" inline-block text-sm text-default-text p-1">{data.date}</p>
						<div className="flex flex-row gap-2">
							<p className="self-center text-sm font-semibold text-gray-06 p-1">영화관 위치</p>
							<p className="inline-block text-sm text-default-text p-1">{data.address}</p>
							<p className="inline-block text-sm text-default-text p-1">({data.latitude}, {data.longitude})</p>
						</div>
						<div className="flex flex-row items-center gap-2">
							<p className="self-center text-sm font-semibold text-gray-06 p-1">영화 대표 색상</p>
							<div className={`w-[10px] h-[10px] bg-[${movieColor}] rounded-full`} />
						</div>
					</div>
				</div>
				<div className="bg-white shadow-md p-6 rounded-xl mt-8">
					<p className="bg-white text-sm text-default-text font-light whitespace-pre-line">{data.description}</p>
				</div>
			</div>
		</div>
	);
}

export default MovieDetailPage;