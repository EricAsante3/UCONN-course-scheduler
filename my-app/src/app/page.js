"use client"
import Image from "next/image";
import SearchBlock from "./searchBlock/searchBlock";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <div className="min-w-7xl w-7xl ">
        <div className="grid grid-cols-2 grid-rows-[100px_1fr_1fr]">

          <div className="col-span-2 h-full p-4 ">
            <div className="bg-foreground h-full">
              sa
            </div>
          </div>

          <SearchBlock></SearchBlock>

          <div className="bg-foreground aspect-square rounded-2xl min-w-xl w-xl row-span-1 col-span-1 justify-self-center text-2xl">
            sss
          </div>

          <div className="col-span-2 p-4">
            <div className="bg-foreground h-full rounded-2xl">
              sa
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
