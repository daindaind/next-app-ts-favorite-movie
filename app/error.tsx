'use client'

import { PAGE_URL } from '@/constants/router'
import Link from 'next/link'
import React from 'react'

function Error() {
  return (
      <div className='flex h-svh flex-1 justify-center items-center flex-col gap-3'>
         <p className='text-3xl'>😵</p>
         <h3 className='font-light text-2xl'>예상치 못한 에러가 발생했습니다.</h3>
         <h3 className='font-light text-xl'>잠시 후에 다시 이용해주세요.</h3>
         <Link href={`${PAGE_URL.BASE}`} className='mt-2'>
            <p className='underline font-semibold text-gray-05 hover:cursor-pointer hover:text-cherry-pink'>홈으로 이동하기</p>
         </Link>
      </div>
  )
}

export default Error