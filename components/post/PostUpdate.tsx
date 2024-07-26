'use client';

import React, { useEffect, useRef, useState } from 'react';
import Input from '../common/Input';
import { DatePicker } from '@nextui-org/date-picker';
import TextInput from '../common/TextInput';
import Button from '../common/Button';
import { PostType } from '@/types/data';
import Image from 'next/image';
import { MdOutlinePhoto } from 'react-icons/md';
import { CalendarDate } from '@nextui-org/react';

interface PostUpdateProps {
   data: PostType | null;
}

function PostUpdate({ data }: PostUpdateProps) {
	const [imgUrl, setImgUrl] = useState<string | undefined>('');
	const fileInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (data?.images.length) {
			setImgUrl(`${process.env.NEXT_PUBLIC_API_URL}/${data?.images[0]?.uri}`);
		}
	}, [data]);

	const insertImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		let reader = new FileReader();
    
		if (e.target.files && e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}
    
		reader.onloadend = () => {
			const previewImgUrl = reader.result as string;
    
			if (previewImgUrl) {
				setImgUrl(previewImgUrl);
			}
		};
	};

	const handleButtonClick = () => {
		fileInput.current?.click();
	};

	return (
		<div className="flex flex-col gap-7 w-4/5 self-center">
			<h2 className="text-default-text text-3xl font-light">당신이 좋아하는 작품을 공유해주세요.</h2>
			<div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">위도</p>
				<Input
					name="latitude"
					placeholder="관람 장소의 위도를 입력해주세요."
					defaultValue={data?.latitude}
				/>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">경도</p>
				<Input
					name="longitude"
					placeholder="관람 장소의 경도를 입력해주세요."
					defaultValue={data?.longitude}
				/>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">별점</p>
				<Input
					name='score'
					placeholder="본인의 평점을 입력해주세요."
					defaultValue={data?.score}
				/>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">대표 색상</p>
				<Input
					name='color'
					placeholder="작품을 대표하는 색상을 지정해주세요. (Hex Code)"
					defaultValue={data?.color}
				/>
			</div>
			{/* <div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">날짜</p>
				<DatePicker
					name='date'
					label="Birth date" 
					className="max-w-[284px] rounded-md border-2 border-stone-200 p-2 text-sm text-gray-04" 
				/>
			</div> */}
			<div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">제목</p>
				<Input
					name="title"
					placeholder="작품 제목을 입력해주세요."
					defaultValue={data?.title}
				/>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">위치</p>
				<Input
					name="address"
					placeholder="작품을 관람한 주소를 입력해주세요."
					value={data?.address}
				/>
			</div>
			<div className="flex flex-col gap-3 w-full">
				<p className="text-gray-01 text-sm font-normal">작품 줄거리</p>
				<TextInput
					name="description"
					placeholder="줄거리를 입력해주세요."
					defaultValue={data?.description}
				/>
			</div>
			<div className="flex flex-row gap-5">
				{imgUrl ? (
					<Image className="object-cover bg-white rounded-md" width={250} height={360} alt="Poster" src={imgUrl} />
				) : (
					<div className="flex flex-col align-middle justify-center w-[250px] h-[360px] bg-slate-50 rounded-md" >
						<MdOutlinePhoto className="self-center" color="#838d9b" size={40} />
					</div>
				)}
				<div>
					<input 
						name="imageUri"
						type="file"
						accept="image/*"
						onChange={insertImg}
						className='hidden'
						ref={fileInput}
					/>
					<Button 
						label="Choose an image"
						onClick={handleButtonClick}
						type="button"
					/>
				</div>
			</div>
			<Button label="작품 소개 업로드" type="submit" />
		</div>
	);
}

export default PostUpdate;