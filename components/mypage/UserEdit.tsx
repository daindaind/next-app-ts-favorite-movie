'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'

interface UserEditProps {
 }

const UserEdit = ({ }: UserEditProps) => {
   const [previewImg, setPreviewImg] = useState('');

   const insertImg = (e: React.ChangeEvent<HTMLInputElement>) => {
     let reader = new FileReader()
   
     if (e.target.files && e.target.files[0]) {
       reader.readAsDataURL(e.target.files[0])
     }
   
     reader.onloadend = () => {
       const previewImgUrl = reader.result as string
   
       if (previewImgUrl) {
         setPreviewImg(previewImgUrl)
       }
     }
   }

  return (
    <>
      <h1 className='text-3xl font-bold text-gray08'>개인 정보 수정</h1>
      <div className='flex flex-col gap-5'>
         <h2 className='text-md font-semibold text-gray-05'>프로필 사진</h2>
         <div className='flex flex-row gap-3'>
            {previewImg ? <Image src={previewImg} alt='profile' width={200} height={200} className='rounded-lg bg-stone-100' />
            : <div className='w-[200px] h-[200px] bg-stone-100 rounded-lg' />}
            <input name='imageUri' type='file' alt='이미지 업로드' onChange={(e) => insertImg(e)} />
         </div>
      </div>
      <div className='flex flex-col gap-5'>
         <h2 className='text-md font-semibold text-gray-05'>닉네임</h2>
         <Input name="nickname" placeholder='닉네임을 입력해주세요.' />
      </div>
      <div className='ml-auto mt-auto'>
         <Button label="수정 완료" type="submit" />
      </div>
    </>
  )
}

export default UserEdit