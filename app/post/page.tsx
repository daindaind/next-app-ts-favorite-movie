import React from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextInput from "@/components/common/TextInput";
import { DatePicker } from "@nextui-org/date-picker";
import { headers } from "next/headers";
import { API_URL, PAGE_URL } from "@/constants/router";
import { redirect } from "next/navigation";

// TODO: post 이후 다른 페이지로 이동
async function create(formData: FormData) {
	'use server';
	const headersList = headers();
	const authorization = headersList.get('authorization');

	const postData = {
		latitude: formData.get('latitude'),
		longitude: formData.get('longitude'),
		color: formData.get('color'),
		address: formData.get('address'),
		title: formData.get('title'),
		description: formData.get('description'),
		date: formData.get('date'),
		score: formData.get('score'),
		imageUris: formData.get('imageUrls'),
	};

	if (postData && authorization) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS}`, {
				method: 'POST',
				headers: JSON.parse(authorization),
				body: JSON.stringify({
					latitude: String(postData.latitude),
					longitude: String(postData.longitude),
					color: String(postData.color),
					address: String(postData.address),
					title: String(postData.title),
					description: String(postData.description),
					date: String(postData.date),
					score: Number(postData.score),
					imageUris: [],  // TODO: 실제 url 리스트 필요
				})
			});
			console.log(res);
		} catch (e) {
			console.error(e);
		}
		// redirect는 try catch 문에 쓰면 안돼..
		redirect(`${PAGE_URL.MOVIES}`);
	}
}

function PostPage() {
	return (
		<form className="flex flex-col align-middle justify-center gap-7 p-7 pb-[100px]" action={create} >
			<div className="flex flex-col gap-7 w-4/5 self-center">
				<h2 className="text-default-text text-3xl font-light">당신이 좋아하는 작품을 공유해주세요.</h2>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">위도</p>
					<Input
						name="latitude"
						placeholder="관람 장소의 위도를 입력해주세요."
					/>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">경도</p>
					<Input
						name='longitude'
						placeholder="관람 장소의 경도를 입력해주세요."
					/>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">별점</p>
					<Input
						name='score'
						placeholder="본인의 평점을 입력해주세요."
					/>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">대표 색상</p>
					<Input
						name='color'
						placeholder="작품을 대표하는 색상을 지정해주세요. (Hex Code)"
					/>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">날짜</p>
					<DatePicker name='date' label="Birth date" className="max-w-[284px] rounded-md border-2 border-stone-200 p-2 text-sm text-gray-04" />
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">제목</p>
					<Input
						name="title"
						placeholder="작품 제목을 입력해주세요."
					/>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">위치</p>
					<Input
						name="address"
						placeholder="작품을 관람한 주소를 입력해주세요."
					/>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">작품 줄거리</p>
					<TextInput
						name="description"
						placeholder="줄거리를 입력해주세요."
					/>
				</div>
				<div className="flex flex-row gap-5">
					{/* TODO: 이미지 업로드 하기 */}
					{/* {imgUrl ? (
            <Image className="object-cover bg-white rounded-md" width={250} height={360} alt="Poster" src={imgUrl}/>
          ) : (
            <div className="flex flex-col align-middle justify-center w-[250px] h-[360px] bg-white rounded-md" >
              <MdOutlinePhoto className="self-center" color="#838d9b" size={40} />
            </div>
          )} */}
					{/* <div>
            <input 
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              ref={fileInput}
            />
            <Button 
              label="Choose an image"
              onClick={handleButtonClick}
              type="button"
            />
          </div> */}
				</div>
				<Button label="작품 소개 업로드" type="submit" />
			</div>
		</form>
	);
}

export default PostPage;
