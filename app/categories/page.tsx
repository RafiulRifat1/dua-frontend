export const dynamic = "force-dynamic";
import Image from 'next/image';
import Link from 'next/link';
import LeftSidebar from '../component/LeftSidebar';
import DuasForCategory from './DuaForCategory';


interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
}

interface Dua {
  id: number;
  category_id: number;
  subcategory_id: number;
  title: string;
  arabic: string;
  Reference: string;
  transliteration: string;
  translation: string;
  slug: string;
  }

export default async function Home() {

  const [catRes, subCatRes, duaRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: "no-store" }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/subcategories`, { cache: "no-store" }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/subcategories/duas`, { cache: "no-store" }),
  ]);

  const categories = (await catRes.json()) as Category[];
  const subcategories = (await subCatRes.json()) as Subcategory[];
  const duas = (await duaRes.json()) as Dua[];


  return (
  <div className="w-full md:w-[calc(100%-352px)] overflow-y-none md:mx-[352px]">
    <LeftSidebar />
    <div className="flex px-2 sm:px-3 lg:px-6 items-center font-medium flex-row gap-2 text-sm py-3.5 bg-[#e1ebe1] text-[#417360] font-sans">
         <div className="min-w-dvh mx-auto flex items-center gap-2">
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
        <Link href="/categories" className="">Categories of Duas</Link>          
         </div>

    </div>
    <DuasForCategory duas ={duas as any} slug=""/>
  </div>
  );
}