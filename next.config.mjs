/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		// 통신 규약 패턴
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.namu.wiki",
				port: "",
				// ** : 아무거나 올 수 있음
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "image.ajunews.com",
				port: "",
				// ** : 아무거나 올 수 있음
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				// ** : 아무거나 올 수 있음
				pathname: "/**",
			},
		],
	},
};
 
export default nextConfig;
 