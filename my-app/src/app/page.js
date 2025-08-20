"use client"
import Image from "next/image";
import SearchBlock from "./searchBlock/searchBlock";
import ScheduleBlock from "./ScheduleBlock/ScheduleBlock";
import Cart from "./CartBlock/Cart";

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


          <Cart></Cart>

          <ScheduleBlock></ScheduleBlock>
        </div>
      </div>
    </div>
  );
}
