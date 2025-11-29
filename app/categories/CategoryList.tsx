
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link"; 

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
}

interface Props {
  categories: Category[];
  subcategories: Subcategory[];
  duas: Dua[];
}

export default function CategoryList({ categories, subcategories, duas }: Props) {
  const [activeCatId, setActiveCatId] = useState<number | null>(1);

  const toggleCategory = (id: number) => {
    setActiveCatId(activeCatId === id ? null : id);
  };

  const [activeSub, setActiveSub] = useState<number | null>(null);

  const toggleSub = (id: number) => {setActiveSub(activeSub === id ? null : id);};


  return (
    <div className="space-y-4 mt-4">
      {categories.map((cat) => {
        const isActive = activeCatId === cat.id;

        
        const currentSubcategories = subcategories.filter(
          (sub) => sub.category_id === cat.id
        );

       
        const currentDuasCount = duas.filter(
          (dua) => dua.category_id === cat.id
        ).length;

        return (
          <div key={cat.id} className="group">
            {/* Category Header */}
            <div
              onClick={() => toggleCategory(cat.id)}
              className={`cursor-pointer rounded-xl p-4 pt-0 flex items-center justify-between transition-all duration-300 ${
                isActive ? "bg-white" : "bg-white hover:bg-[#E8F0F5]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#CFE0E5] p-2 rounded-lg shrink-0">
                  <Image
                    src={`/${cat.slug}.svg`} 
                    alt="icon"
                    width={40}
                    height={40}
                    priority={true}
                    className="w-8 h-8"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm opacity-70 text-[#282E29]">
                    {cat.name}
                  </h3>
                  
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {currentSubcategories.length} Subcategories • {currentDuasCount} Duas
                  </p>
                </div>
              </div>
            </div>

            
            {isActive && (
              <div className="relative ml-8 border-l-2 border-opacity-40 border-dashed border-[#417360]/40 pb-4">
                {currentSubcategories.length > 0 ? (
                  currentSubcategories.map((sub) => {
                    const subDua = duas.filter(dua => dua.subcategory_id === sub.id);
                    console.log("dua:", subDua);
                    
                   return (
                    <div key={sub.id} className="relative pl-6 py-2 group/item cursor-pointer">
                      
                      {/* Dotted Line connector */}
                      <div className="absolute left-0 top-[18px] w-4 border-t-2 border-dashed border-[#417360]/40"></div>

                      {/* <Link href={`/${sub.slug}/${sub.id}`}> */}
                        <p onClick={() => {toggleSub(sub.id)}} className={`font-semibold opacity-70 text-[14px] leading-[22px] tracking-[0.01em] ${activeSub === sub.id ?"text-[#417360]" : "text-[#282E29]"} transition-colors`}>
                          {sub.name} 
                        </p>
                      {/* </Link> */}
                      {activeSub === sub.id && (
                        <div className="">
                          {subDua.map((dua: Dua) => (
                            <div key={dua.id} className="flex items-center gap-2 pl-4 py-1 font-regular text-sm text-[#282E29]">
                              <svg width="24" height="24" className="shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.6" d="M20 17L15 14.1132V19.8868L20 17ZM4.5 7C4.5 6.72386 4.27614 6.5 4 6.5C3.72386 6.5 3.5 6.72386 3.5 7H4.5ZM3.58872 8.37077C3.62444 8.64459 3.87537 8.83761 4.1492 8.80189C4.42302 8.76617 4.61604 8.51524 4.58032 8.24142L3.58872 8.37077ZM5.22067 10.6364C5.11489 10.3813 4.82236 10.2602 4.56728 10.366C4.3122 10.4718 4.19117 10.7643 4.29694 11.0194L5.22067 10.6364ZM5.66955 13.3925C5.83781 13.6115 6.15171 13.6526 6.37067 13.4843C6.58963 13.316 6.63073 13.0021 6.46247 12.7832L5.66955 13.3925ZM8.21682 14.5375C7.99786 14.3693 7.68396 14.4104 7.5157 14.6293C7.34744 14.8483 7.38854 15.1622 7.6075 15.3305L8.21682 14.5375ZM9.9806 16.7031C10.2357 16.8088 10.5282 16.6878 10.634 16.4327C10.7398 16.1776 10.6187 15.8851 10.3637 15.7793L9.9806 16.7031ZM12.7586 16.4197C12.4848 16.384 12.2338 16.577 12.1981 16.8508C12.1624 17.1246 12.3554 17.3756 12.6292 17.4113L12.7586 16.4197ZM15.5 17.5C15.7761 17.5 16 17.2761 16 17C16 16.7239 15.7761 16.5 15.5 16.5V17.5ZM18.5 16.5C18.2239 16.5 18 16.7239 18 17C18 17.2761 18.2239 17.5 18.5 17.5V16.5ZM4 7H3.5C3.5 7.46435 3.53017 7.92191 3.58872 8.37077L4.08452 8.30609L4.58032 8.24142C4.52735 7.83534 4.5 7.42099 4.5 7H4ZM4.75881 10.8279L4.29694 11.0194C4.65104 11.8733 5.11444 12.6701 5.66955 13.3925L6.06601 13.0878L6.46247 12.7832C5.95999 12.1293 5.54083 11.4084 5.22067 10.6364L4.75881 10.8279ZM7.91216 14.934L7.6075 15.3305C8.32986 15.8856 9.1267 16.349 9.9806 16.7031L10.1721 16.2412L10.3637 15.7793C9.5916 15.4592 8.87069 15.04 8.21682 14.5375L7.91216 14.934ZM12.6939 16.9155L12.6292 17.4113C13.0781 17.4698 13.5356 17.5 14 17.5V17V16.5C13.579 16.5 13.1647 16.4726 12.7586 16.4197L12.6939 16.9155ZM14 17V17.5H15.5V17V16.5H14V17Z" fill="#417360"/>
                              </svg>
                                <div className="">{dua.title}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )})
                ) : (
                  <p className="pl-6 text-xs text-gray-400">No subcategories found</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}