'use client';

import React, { useRef, useState } from 'react';
import Input from '../common/Input';
import { DatePicker } from '@nextui-org/date-picker';
import TextInput from '../common/TextInput';
import Image from 'next/image';
import { MdOutlinePhoto } from 'react-icons/md';
import Button from '../common/Button';
import SearchKakaoMap from '../common/SearchKakaoMap';
import { PLACE_DTO } from '@/types/dto';

const PostUI = () => {
	const [imgUrl, setImgUrl] = useState('');
	const [place, setPlace] = useState<PLACE_DTO>(); 
	const fileInput = useRef<HTMLInputElement>(null);

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

	if (place) console.log(place);

	return (
		<div className='flex flex-row gap-5'>
			<div className="w-[400px] h-[400px] mt-5">
				<SearchKakaoMap setPlace={setPlace} />
			</div>
			<div className="flex flex-col gap-7 w-4/5 self-cente">

				<h2 className="text-default-text text-3xl font-light">당신이 좋아하는 작품을 공유해주세요.</h2>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">위도</p>
					<Input
						name="latitude"
						disabled={true}
						placeholder='왼쪽 지도에서 위치를 검색해주세요.'
						value={place?.x || ''}
					/>
				</div>
				<div className="flex flex-col gap-3 w-full">
					<p className="text-gray-01 text-sm font-normal">경도</p>
					<Input
						name='longitude'
						disabled={true}
						placeholder='왼쪽 지도에서 위치를 검색해주세요.'
						value={place?.y || ''}
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
						placeholder='왼쪽 지도에서 위치를 검색해주세요.'
						disabled={true}
						value={`${place?.place_name} (${place?.address_name})` || ''}
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
		</div>
		
	);
};

export default PostUI;
