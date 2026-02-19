import Duas from "./Duas";
import LeftSidebar from "@/app/component/LeftSidebar";
import Image from "next/image";
import Link from "next/link";

interface Dua {
  id: number;
  category_id: number;
  subcategory_id: number;
  title: string;
  arabic: string;
  reference: string;
  transliteration:string;
  translation:string; 
  slug: string;
}


export default  async function Page({ params }: { params: { slug: string; id: string } }) {
  const { slug, id } = await params;


    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/duas/${id}`, {
  cache: "no-store"
});
  const duas = await res.json();


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
        <Link href="/categories" className="">Categories of Dua </Link>
        <Image
          src="/right-arrow.png"
          alt="Right Arrow"
          width={14}
          height={14}
        />
        <Link href={`/categories/${slug}/${id}`} className="">{slug.replace(/-/g, ' ').charAt(0).toUpperCase() + slug.replace(/-/g, ' ').slice(1).replace(/%26/g, '&' )} </Link>    
         </div>

    </div>
    <Duas duas ={duas as Dua[]} slug={slug as string}/>
  </div>
  );
}
