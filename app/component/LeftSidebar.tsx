// app/components/LeftSidebar.tsx

import CategoryList from "../categories/CategoryList";
import React from 'react'; // React import যোগ করা হয়েছে

// Interfaces
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


async function fetchAllData() {
    const [catRes, subcatRes, duaRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { cache: "no-store" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/subcategories`, { cache: "no-store" }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/subcategories/duas`, { cache: "no-store" }),
    ]);

    const categories: Category[] = await catRes.json();
    const subcategories: Subcategory[] = await subcatRes.json();
    const duas: Dua[] = await duaRes.json();
    
    return { categories, subcategories, duas };
}


export default async function LeftSidebar() {
  const { categories, subcategories, duas } = await fetchAllData();
  
  return (
    <div 
      className="fixed left-17 top-16 w-[352px] h-[calc(100vh-64px)] bg-[#eef6eb2f] border border-gray-100 z-10 hidden md:flex flex-col"
    >
      <div className="px-5 pt-5 pb-4 rounded-t-3xl text-center shrink-0"> 
        <div className="bg-[#e1ebe10e] rounded-full overflow-hidden flex items-center px-4 py-3 shadow-sm focus-within:ring-2 transition-all">
          <div className="shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z" stroke="#7C827D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.5 16.5L15 15" stroke="#7C827D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by Categories"
            className="ml-2.5 outline-none text-gray-900 placeholder-gray-400 text-[15px] font-medium bg-transparent"
          />
        </div>
      </div>

      <div className="grow overflow-y-auto sidebar-scroll px-5 pb-5"> 
        <CategoryList categories={categories} subcategories={subcategories} duas={duas} />
      </div>

    </div>
  );
}