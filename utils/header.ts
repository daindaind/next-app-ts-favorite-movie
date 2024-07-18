import { headers } from "next/headers";

export default function getHeaders() {
   const headersList = headers();
   const authorizationData = headersList.get('authorization');
   const authorization = authorizationData && JSON.parse(authorizationData);

   return authorization;
}