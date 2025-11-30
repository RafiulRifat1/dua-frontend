import CategoryList from "../categories/CategoryList";


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
  transliteration:string;
  translation:string;
  slug: string;
}


export default async function LeftSidebar() {
  const [catRes, subcatRes, duaRes] = await Promise.all([
   await fetch("http://localhost:4000/categories"), 
   await fetch("http://localhost:4000/subcategories"),
   await fetch("http://localhost:4000/categories/subcategories/duas"),
  ]);

  const categories: Category[] = await catRes.json();
  const subcategories: Subcategory[] = await subcatRes.json();
  const duas: Dua[] = await duaRes.json();

  
  return (
    <div className="fixed left-17 top-16 w-[350px] h-full overflow-hidden border border-gray-100 shadow-lg z-10 hidden md:block">
      
      
      <div className=" p-4 rounded-t-3xl text-center">
        
        
        <div className="bg-white rounded-full flex items-center px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-300 transition-all">
          <div className="shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
         <input
            type="text"
            placeholder="Search by Categories"
            className="ml-2 w-full outline-none text-gray-600 placeholder-gray-400 text-sm font-medium bg-transparent"
          />
        </div>
      </div>

     <div className="h-[calc(100%-10px)] overflow-y-auto p-4">
        <CategoryList categories={categories} subcategories={subcategories} duas={duas} />
      </div>
    </div>
  );
}