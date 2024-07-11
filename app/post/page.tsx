'use client'

import React, { useEffect, useState } from "react";
import { MdOutlinePhoto } from "react-icons/md";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import useImagePick from "@/hooks/useImagePick";
import Image from "next/image";
import TextInput from "@/components/common/TextInput";

function PostPage() {
  const { imgUrl, fileInput, handleButtonClick, handleImageUpload } =
  useImagePick();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    title: '',
    summary: '',
    instructions: '',
    image: ''
  });

  useEffect(() => {
    setUserData(prev => ({...prev, image: imgUrl}))
  }, [imgUrl]);

  const handleOnSubmit = () => {
    console.log(userData);
  }

  return (
    <div className="flex flex-col align-middle justify-center gap-7 p-7" onSubmit={handleOnSubmit} >
      <div className="flex flex-col gap-7 w-4/5 self-center">
        <h2 className="text-default-text text-3xl font-light">당신이 좋아하는 작품을 공유해주세요.</h2>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">이름</p>
          <Input
            value={userData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">이메일</p>
          <Input
            value={userData.email}
            onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="이메일을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">영화 제목</p>
          <Input
            value={userData.title}
            onChange={e => setUserData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="영화 제목을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">영화 줄거리</p>
          <Input
            value={userData.summary}
            onChange={e => setUserData(prev => ({ ...prev, summary: e.target.value }))}
            placeholder="영화 줄거리를 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">주의 사항</p>
          <TextInput
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setUserData(prev => ({ ...prev, instructions: e.target.value }))}
            placeholder="주의 사항을 입력해주세요."
          />
        </div>
        <div className="flex flex-row gap-5">
          {imgUrl ? (
            <Image className="object-cover bg-white rounded-md" width={250} height={360} alt="Poster" src={imgUrl}/>
          ) : (
            <div className="flex flex-col align-middle justify-center w-[250px] h-[360px] bg-white rounded-md" >
              <MdOutlinePhoto className="self-center" color="#838d9b" size={40} />
            </div>
          )}
          <div>
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
          </div>
        </div>
        <Button label="작품 소개 업로드" type="submit" />
      </div>
    </div>
  );
}

export default PostPage;
