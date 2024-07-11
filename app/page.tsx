import {movieData} from '../data/data';
import FirstUI from "@/components/home/FirstUI";
import SecondUI from "@/components/home/SecondUI";
import ThirdUI from "@/components/home/ThirdUI";
import RootLayout from './layout';

export default function Home() {
  const data = movieData.products;

  return (
    <>
        <FirstUI data={data}/>
        <SecondUI data={data}/>
        <ThirdUI data={data}/>
    </>
  );
}
