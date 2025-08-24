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


export default function Home() {
  const {ScheduleBlockStates} = useContext(DataContext);
  return (
    <div className="relative flex items-center justify-center">
      <div className="min-w-7xl w-7xl ">
        <div className=" grid grid-cols-2 grid-rows-[150px_1fr_1fr] ">

          <div className="relative col-span-2 h-full flex justify-center w-1/2 justify-self-center self-center ">

            <div className="relative h-fit w-1/2 flex items-center justify-center  mt-8 ">
              <img className="w-sm" src="/minecraft_title.png" alt="Logo" />

              <div className="absolute -right-28 -bottom-4 w-72 text-yellow-500 text-lg font-bold -rotate-18 text-center ">
                <h3 className="truncate font-minecraft">Version 2 !!!</h3>
              </div>
            </div>

          <div className="absolute top-26 z-10 left-36">
            <Sprite></Sprite>
          </div>

          </div>

          <SearchBlock></SearchBlock>


          <Cart></Cart>

          <ScheduleBlock></ScheduleBlock>


          {ScheduleBlockStates.smallCalenderPopUpVisiablity && !ScheduleBlockStates.largeCalenderPopUpVisiablity? 
            <PopUpCalendar className={"absolute bottom-8 -left-8"}></PopUpCalendar> 
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

      <h2   onClick={() => window.open( "https://www.linkedin.com/in/eric-asante-8a7275220", "_blank")} 
      className="absolute cursor-pointer font-bold top-2 left-2">Created by Eric Asante</h2>

    </div>
  );
}
