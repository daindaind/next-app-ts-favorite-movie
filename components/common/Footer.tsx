import React from 'react';
import { RiMovie2Line } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';

function Footer() {
	return (
		<div className='flex flex-row gap-8 items-center p-7 w-full h-[150px] bg-slate-50'>
			<div className='flex flex-row gap-2'>
				<RiMovie2Line size={20} className='text-slate-600'/>
			   <p className='text-sm font-semibold text-slate-600'>MOVIE</p>
			</div>

			<p className='text-sm font-light text-slate-600 '>경기도 안산시 단원구 원초로 9</p>

			<div className='flex flex-row items-center gap-4 ml-auto'>
				<p className='text-sm font-light text-slate-600'>developed by : daindaind</p>
				<Link href="https://github.com/daindaind/next-app-ts-favorite-movie">
					<FaGithub size={30} className='text-slate-600'/>
				</Link>
			</div>
		</div>
	);
}

export default Footer;