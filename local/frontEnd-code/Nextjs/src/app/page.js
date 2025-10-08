"use client"
import SearchBlock from "./searchBlock/searchBlock";
import ScheduleBlock from "./ScheduleBlock/ScheduleBlock";
import Cart from "./CartBlock/Cart";
import PopUpCalendar from "./scheduleViews/schedulePopUpView";
import { DataContext } from "@/data/Data";
import { useContext } from "react";
import FullSchedulePopUp from "./PopUps/fullSchedulePopUp";
import DetailViewPopUp from "./PopUps/DetailViewPopUp";
import BreakSelectPopUp from "./PopUps/breakSelectPopUp";
import Sprite from "./Sprite/SpriteAnimation";
import { motion } from "framer-motion";

export default function Home() {
  const {ScheduleBlockStates} = useContext(DataContext);
  return (
    <div className="relative flex items-center justify-center">
      <div className="min-w-7xl w-7xl ">
        <div className=" grid grid-cols-2 grid-rows-[150px_1fr_1fr] ">

          <div className="relative col-span-2 h-full flex justify-center w-1/2 justify-self-center self-center">

            <div className="relative h-fit w-full flex items-center justify-center bg-green-600">


            </div>

          <div className="absolute top-26 z-10 left-36">
            <Sprite></Sprite>
          </div>

          </div>

          <SearchBlock></SearchBlock>


          <Cart></Cart>

          <ScheduleBlock></ScheduleBlock>


          {ScheduleBlockStates.smallCalenderPopUpVisiablity && !ScheduleBlockStates.largeCalenderPopUpVisiablity? 
            <PopUpCalendar className={"absolute bottom-8 left-32"}></PopUpCalendar> 
            : null}


        </div>
      </div>


      { ScheduleBlockStates.detailedViewPopUpVisiablity ?
        <DetailViewPopUp></DetailViewPopUp> : null
      }


      { ScheduleBlockStates.largeCalenderPopUpVisiablity ?
        <FullSchedulePopUp></FullSchedulePopUp> : null
      }

      {   ScheduleBlockStates.breakViewPopup ?
        <BreakSelectPopUp></BreakSelectPopUp>: 
        null

      }

      <div className="mainBoxes absolute h-16 font-bold top-0 left-0 w-full bg-navyBlue  items-center flex flex-row justify-between">
        <img src="/uconn-wordmark-side-white.png" className="ml-8 h-12 w-auto" alt="UConnLogo" />
        <div className="flex flex-col justify-center mr-8">
          <h1 className="text-3xl text-white text-center">Student Course Scheduler</h1>
          <h2 className="text-xs text-white text-center">"For Students, By Students" | Created by Eric Asante</h2>

        </div>

      </div>


      <div className="text-sm pl-8 absolute pb-2 h-fit font-bold bottom-0 left-0 w-full items-center flex flex-row  space-x-6">
        <h2 className="">© 2025 University of Connecticut</h2>
        <h2 onClick={() => window.open( "https://uconn.edu/disclaimers-privacy-copyright/", "_blank")} className="underline cursor-pointer">Disclaimers, Privacy, & Copyright</h2>
        <h2 onClick={() => window.open( "https://accessibility.uconn.edu", "_blank")} className="underline cursor-pointer">Accessibility</h2>

      </div>


    </div>
  );
}
