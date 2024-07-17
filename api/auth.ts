import { API_URL } from "@/constants/router";
import axiosInstance from "./axios";

interface AuthProps {
   email: string;
   password: string;
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
   })

   console.log(res);
   return res;
}

export { signup, login }