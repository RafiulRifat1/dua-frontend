import Image from 'next/image';
import Link from 'next/link';
import LeftSidebar from '../component/LeftSidebar';
import Duas from './slug/id/Duas';


export default async function Home() {

    const [catRes, sunCatRes, duaRes] = await Promise.all([
      await fetch("http://localhost:4000/categories"),
      await fetch("http://localhost:4000/subcategories"),
      await fetch("http://localhost:4000/categories/subcategories/duas"),]
    );
    const [categories, subcategories, duas] = [
      await catRes.json(),
      await sunCatRes.json(),
      await duaRes.json(),
    ];


  return (
  <div className="w-full md:w-[calc(100%-349px)] md:mx-[349px]">
    <LeftSidebar />
    <div className="flex px-2 sm:px-3 lg:px-6 items-center font-medium flex-row gap-2 text-sm py-3.5 bg-[#e1ebe1] text-[#417360] font-sans">
         <Image
         src="/home.png"
          alt="Dua Illustration"
          width={18}
          height={18}
        />
        <Link href="/" className="font-bold">Home</Link>
        <Image
          src="/right-arrow.png"
          alt="Right Arrow"
          width={14}
          height={14}
        />
        <Link href="/categories" className="">Categories of Dua</Link>
    </div>
    <div className="flex px-2 sm:px-3 lg:px-6 min-h-[108px] items-center justify-between font-medium flex-row gap-4 text-xs py-3.5 bg-[#EEF6EB] text-black font-sans">
      <div className="">
        <p><span className="font-semibold text-base text-[#417360] pr-2.5">Section :</span>
        <span className="text-base font-normal">{duas[1].title}</span></p>
      </div>
  </div>
    <Duas />
  </div>
  );
}