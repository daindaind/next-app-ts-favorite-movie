import React from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import TextInput from "@/components/common/TextInput";
import { postArticle } from "@/api/post";
import { DatePicker } from "@nextui-org/date-picker";

async function create(formData: FormData) {
  'use server'

  const postData = {
    latitude: formData.get('latitude'),
    longitude: formData.get('longitude'),
    color: formData.get('color'),
    address: formData.get('adress'),
    title: formData.get('title'),
    description: formData.get('description'),
    date: formData.get('data'),
    score: formData.get('score'),
    imageUris: formData.get('imageUrls'),
  }

  if (postData) {
    try {
      const res = await postArticle({
        latitude: String(formData.get('latitude')),
        longitude: String(formData.get('longitude')),
        color: String(formData.get('color')),
        address: String(formData.get('address')),
        title: String(formData.get('title')),
        description: String(formData.get('description')),
        date: String(formData.get('date')),
        score: Number(formData.get('score')),
        imageUris: [],  // TODO: 실제 url 리스트 필요
      });
      console.log(res);
      // redirect(`${PAGE_URL.MOVIES}`);  // TODO 왜 안 될까ㅜㅜ
    } catch (e) {
      console.error(e);
    }
  }
}

function PostPage() {
  return (
    <form className="flex flex-col align-middle justify-center gap-7 p-7" action={create} >
      <div className="flex flex-col gap-7 w-4/5 self-center">
        <h2 className="text-default-text text-3xl font-light">당신이 좋아하는 작품을 공유해주세요.</h2>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">위도</p>
          <Input
            name="latitude"
            placeholder="영화관 위도를 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">경도</p>
          <Input
            name='longitude'
            placeholder="영화관 경도를 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">별점</p>
          <Input
            name='score'
            placeholder="본인의 영화 평점을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">대표 색상</p>
          <Input
            name='color'
            placeholder="영화를 대표하는 색상을 지정해주세요. (Hex Code)"
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">날짜</p>
          <DatePicker name='date' label="Birth date" className="max-w-[284px] rounded-md border-2 border-stone-200 p-2 text-sm text-gray-04" />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">영화 제목</p>
          <Input
            name="title"
            placeholder="영화 제목을 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">영화관 위치</p>
          <Input
            name="address"
            placeholder="영화관 주소를 입력해주세요."
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-gray-01 text-sm font-normal">영화 줄거리</p>
          <TextInput
            name="description"
            placeholder="영화 줄거리를 입력해주세요."
          />
        </div>
        <div className="flex flex-row gap-5">
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
