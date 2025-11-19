import Image from 'next/image';
import Link from 'next/link';
import "./globals.css"


export default async function Home() {

    const data = await fetch('http://localhost:4000/categories');
    const posts = await data.json();
    console.log(posts);


  return (
  <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
    <div className="flex items-center font-medium flex-row gap-2 text-sm py-3.5  text-[#417360] font-sans">
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
    <div className="flex min-h-[108px] items-center justify-between font-medium flex-row gap-4 text-xs px-5 rounded-xl py-3.5 bg-[#e1ebe188] text-black font-sans">
      <div className="">
        <p className="font-extrabold text-xl pb-1.5">Categories of Dua</p>
        <p className="text-sm text-[#417360]">Total Categories: {posts.length}</p>
      </div>
    <div className="relative w-full max-w-[220px]">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10">
        <Image src="/search.png" alt="Search Icon" width={18} height={18} />
      </div>

      <input
        type="text"
        placeholder="Search Dua Categories"
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full placeholder:text-sm placeholder:font-medium focus:outline-none"
        aria-label="Search Dua Categories"
      />
    </div>
  </div>
  </div>
  );
}