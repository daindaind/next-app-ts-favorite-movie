import { login, signup } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

function useLogin(mutationOption?: any) {
	return useMutation({
		mutationFn: login,
		onSuccess: data => {
			console.log(data);
		},
		onError: error => {
			console.error(error);
		},
		...mutationOption
	});
}

function useSignup(mutationOption?: any) {
	return useMutation({
		mutationFn: signup,
		onSuccess: data => {
			console.log(data);
		},
		onError: error => {
			console.error(error);
		},
		...mutationOption
	});
}

export default function useAuth() {
	const loginMutation = useLogin();
	const signupMutation = useSignup();

	return {
		loginMutation,
		signupMutation
	};
}