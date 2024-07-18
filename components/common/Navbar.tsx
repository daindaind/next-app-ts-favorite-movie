import { PAGE_URL } from "@/constants/router";
import Link from "next/link";
import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { headers } from 'next/headers';
import LoggedInNavbar from "./navbar/LoggedInNavbar";
import NotLoggedInNavbar from "./navbar/NotLoggedInNavbar";

interface NavbarProps {}

function Navbar({}: NavbarProps) {
	const headersList = headers();
	const isLoggedIn = headersList.get('x-logged-in') === 'true';

	return (
		<ul className="flex flex-row justify-center align-middle h-15 p-5">
			<Link href={PAGE_URL.BASE}>
				<div  className="flex flex-row gap-2 items-center">
					<RiMovie2Line size={30}/>
					<p className="text-lg font-semibold tracking-widest">MOVIE</p>
				</div>
			</Link>
			{!isLoggedIn ? (
				<NotLoggedInNavbar />
			) : (
				<LoggedInNavbar />
			)}
		</ul>
	);
}

export default Navbar;
