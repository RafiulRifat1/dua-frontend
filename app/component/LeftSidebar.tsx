import Image from "next/image";
export default function LeftSidebar() {
  return (
    <div className="hidden md:w-[349px] h-screen fixed border-l-[#EEF6EB] border md:flex flex-col left-16 top-16 items-center">
        {/* hidden md:flex fixed right-0 top-0 h-screen w-[320px] bg-white z-20 border-l flex-col overflow-auto */}
        <div className="w-full flex py-3 px-4.5">
                <div className="relative w-full max-w-[220px] ">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <Image src="/search.png" alt="Search Icon" width={18} height={18} />
                    </div>

                    <input
                        type="text"
                        placeholder="Search Dua Categories"
                        className="w-full pl-10 pr-4 py-3 border bg-[#E1EBE166] text-[#7C827D] border-gray-300 rounded-full placeholder:text-sm placeholder:font-medium focus:outline-none"
                        aria-label="Search Dua Categories"
                    />
                </div>
        </div>
    </div>
  )
}
