'use client';

import React, { useState } from 'react'
import Input from '../common/Input'
import { DatePicker } from '@nextui-org/date-picker'
import TextInput from '../common/TextInput'
import Button from '../common/Button'
import { PostType } from '@/types/data'
import { API_URL, PAGE_URL } from '@/constants/router';
import { useRouter } from 'next/navigation';

interface PostUpdateProps {
   authorization: any;
   data: PostType | null;
   id: number;
}

function PostUpdate({ authorization, data, id }: PostUpdateProps) {
   const router = useRouter();
   const [inputData, setInputData] = useState({
		color: '',
		title: '',
		description: '',
		date: null,
		score: '',
		imageUris: [],
   })

   const handleSubmit = async (event: any) => {
      event.preventDefault()

      console.log(authorization);

      if (authorization) {
         try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${API_URL.POSTS}/${id}`, {
               method: 'PATCH',
               headers: JSON.parse(authorization),
               body: JSON.stringify(inputData)
            });
            const data = await res.json();
            console.log('반환값: ', data);
            router.replace(`${PAGE_URL.MOVIES}/${id}`);
         } catch (e) {
            console.error(e);
         }
      }
   }

  return (
   <form className="flex flex-col align-middle justify-center gap-7 p-7 pb-[100px]" onSubmit={handleSubmit} >
      <div className="flex flex-col gap-7 w-4/5 self-center">
         <h2 className="text-default-text text-3xl font-light">당신이 좋아하는 작품을 공유해주세요.</h2>
         <div className="flex flex-col gap-3 w-full">
            <p className="text-gray-01 text-sm font-normal">위도</p>
            <Input
               name="latitude"
               placeholder="관람 장소의 위도를 입력해주세요."
               value={data?.latitude}
               disabled
            />
         </div>
         <div className="flex flex-col gap-3 w-full">
            <p className="text-gray-01 text-sm font-normal">경도</p>
            <Input
               name='longitude'
               placeholder="관람 장소의 경도를 입력해주세요."
               value={data?.longitude}
               disabled
            />
         </div>
         <div className="flex flex-col gap-3 w-full">
            <p className="text-gray-01 text-sm font-normal">별점</p>
            <Input
               name='score'
               placeholder="본인의 평점을 입력해주세요."
               value={inputData.score || data?.score}
               onChange={(e) => setInputData((prev) => ({...prev, score: e.target.value}))}
            />
         </div>
         <div className="flex flex-col gap-3 w-full">
            <p className="text-gray-01 text-sm font-normal">대표 색상</p>
            <Input
               name='color'
               placeholder="작품을 대표하는 색상을 지정해주세요. (Hex Code)"
               value={inputData.color || data?.color}
               onChange={(e) => setInputData((prev) => ({...prev, color: e.target.value}))}
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
               value={inputData.title || data?.title}
               onChange={(e) => setInputData((prev) => ({...prev, title: e.target.value}))}
            />
         </div>
         <div className="flex flex-col gap-3 w-full">
            <p className="text-gray-01 text-sm font-normal">위치</p>
            <Input
               name="address"
               placeholder="작품을 관람한 주소를 입력해주세요."
               value={data?.address}
               disabled
            />
         </div>
         <div className="flex flex-col gap-3 w-full">
            <p className="text-gray-01 text-sm font-normal">작품 줄거리</p>
            <TextInput
               name="description"
               placeholder="줄거리를 입력해주세요."
               onChange={(e) => setInputData((prev) => ({...prev, description: e.target.value}))}
               defaultValue={data?.description}
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
  )
}

export default PostUpdate