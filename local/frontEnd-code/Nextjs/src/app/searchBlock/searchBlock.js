"use client"
import { useState,useRef } from "react"
import LeftSide from "./components/leftSide"
import RightSide from "./components/rightSide"
import Sprite from "../Sprite/SpriteAnimation"



export default function SearchBlock() {
  const [loadingSearch, setLoadingSearch] = useState(false);
  const divRef = useRef(null);
  const [leadClass, setLeadClass] = useState(null);

  return (
    <div className="mainBoxes grid grid-rows-1 grid-cols-2 rounded-2xl relative bg-foreground aspect-square row-span-1 col-span-1 justify-self-center text-2xl mb-12 min-w-[400px] w-3/4 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-xl xl:mb-0">

          <div className="absolute -top-10 z-10 right-24">
            <Sprite></Sprite>
          </div>

        <LeftSide divRef={divRef} setLeadClass={setLeadClass} setLoadingSearch={setLoadingSearch} loadingSearch={loadingSearch}></LeftSide>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-px h-11/12 rounded-full bg-Text  opacity-20"></div>
        <RightSide divRef={divRef} leadClass={leadClass} loadingSearch={loadingSearch}></RightSide>

    </div>
  )

}