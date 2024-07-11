import { fetchMovieData } from '@/api';
import FirstUI from "@/components/home/FirstUI";
import SecondUI from "@/components/home/SecondUI";
import ThirdUI from "@/components/home/ThirdUI";

export default async function Home() {
  const data = await fetchMovieData();

  return (
    <>
        <FirstUI data={data}/>
        <SecondUI data={data}/>
        <ThirdUI data={data}/>
    </>
  );
}
