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



export default function Home() {
  const {ScheduleBlockStates} = useContext(DataContext);
  return (
    <div className="relative flex items-center justify-center">
      <div className="min-w-7xl w-7xl ">
        <div className="relative grid grid-cols-2 grid-rows-[100px_1fr_1fr]">

          <div className="col-span-2 h-full p-4 ">
            <div className="bg-foreground h-full">
              sa
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



    </div>
  );
}
