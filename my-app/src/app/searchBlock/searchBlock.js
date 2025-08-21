"use client"
import { useState } from "react"
import LeftSide from "./components/leftSide"
import RightSide from "./components/rightSide"




export default function SearchBlock() {
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [leadClass, setLeadClass] = useState(null);

  return (
    <div id="mainBoxes" className="grid grid-rows-1 grid-cols-2 rounded-2xl relative bg-foreground aspect-square min-w-xl w-xl row-span-1 col-span-1 justify-self-center text-2xl ">

        <LeftSide setLeadClass={setLeadClass} setLoadingSearch={setLoadingSearch} loadingSearch={loadingSearch}></LeftSide>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-px h-11/12 rounded-full bg-Highlight  opacity-50"></div>
        <RightSide leadClass={leadClass} loadingSearch={loadingSearch}></RightSide>

    </div>
  )

}