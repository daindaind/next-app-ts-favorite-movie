import { API_URL } from "@/constants/router";

interface AuthProps {
   email: string;
   password: string;
}

interface UpdateUserDataProps {
   nickname: string;
   imageUrl: string;
}

async function login({email, password}: AuthProps) {
	const res = await fetch(`http://localhost:3000/${API_URL.LOGIN}`, {
		method: 'POST',
		headers: {
			'Content-Type': "application/json"
		},
		body: JSON.stringify({
			email,
			password
		})
	});

	return res;
}

async function signup({email, password}: AuthProps) {
	const res = await fetch(`http://localhost:3000/${API_URL.SINGUP}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email,
			password
		})
	});

	console.log(res);
	return res;
}

async function getUserData() {
	const res = await fetch(`http://localhost:3000/${API_URL.ME}`);
	return res;
}

async function updateUserData({nickname, imageUrl}: UpdateUserDataProps) {
	const res = await fetch(`http://localhost:3000/${API_URL.ME}`, {
		method: "PATCH",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			nickname,
			imageUrl
		})
	});
	return res;
}

async function revokeUser() {
	const res = await fetch(`http://localhost:3000/${API_URL.ME}`,{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return res;
}

async function logout() {
	const res = await fetch(`http://localhost:3000/${API_URL.LOGOUT}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return res;
}

export { signup, login, getUserData, updateUserData, revokeUser, logout };