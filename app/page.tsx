import FirstUI from "@/components/home/FirstUI";
import SecondUI from "@/components/home/SecondUI";
import ThirdUI from "@/components/home/ThirdUI";
import { movieData } from '@/data/data';

export default async function Home() {

	return (
		<>
			<FirstUI data={movieData}/>
			<SecondUI data={movieData}/>
			<ThirdUI data={movieData}/>
		</>
	);
}
