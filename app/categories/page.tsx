export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import LeftSidebar from "../component/LeftSidebar";
import DuasForCategory from "./DuaForCategory";

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
  reference: string;
  transliteration: string;
  translation: string;
  slug: string;
}

const API = process.env.NEXT_PUBLIC_API_URL!;

export default async function Home() {
  const [catRes, subRes, duaRes] = await Promise.all([
    fetch(`${API}/categories`, { cache: "no-store" }),
    fetch(`${API}/subcategories`, { cache: "no-store" }),
    fetch(`${API}/categories/subcategories/duas`, { cache: "no-store" }),
  ]);

  const categories: Category[] = await catRes.json();
  const subcategories: Subcategory[] = await subRes.json();
  const duas: Dua[] = await duaRes.json();

  return (
    <div className="w-full md:w-[calc(100%-352px)] md:mx-[352px]">
      <LeftSidebar />

      <div className="flex items-center gap-2 px-6 py-3 bg-[#e1ebe1] text-[#417360]">
        <Image src="/home.png" alt="Home" width={18} height={18} />
        <Link href="/" className="font-bold">Home</Link>
        <Image src="/right-arrow.png" alt=">" width={14} height={14} />
        <span>Categories of Duas</span>
      </div>

      <DuasForCategory duas={duas} slug="" />
    </div>
  );
}
