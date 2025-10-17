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
import { SearchIconHeader } from "./Icons/Icons";
import { useEffect, useState } from "react";
import { UConnAtoZIcon } from "./Icons/Icons";

export default function Home() {
  const {ScheduleBlockStates} = useContext(DataContext);

  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleMouseEnter = () => {
    setFadeOut(false);
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setFadeOut(true);
  };

  // once fade-out animation completes, hide the element
  useEffect(() => {
    if (fadeOut) {
      const timeout = setTimeout(() => setVisible(false), 500); // match duration
      return () => clearTimeout(timeout);
    }

const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=5.0, user-scalable=yes');
      
      // Double tap to ensure it works
      setTimeout(() => {
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=5.0, user-scalable=yes');
      }, 100);
    }
    // Scroll to top
    window.scrollTo(0, 0);

    // Additional methods to ensure scroll to top works
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

  }, [fadeOut]);
  
  return (
    <div id="main-container" className="relative flex items-center justify-center flex-col min-w-[300px]">


      <div className=" h-[59px] font-bold top-0 left-0 w-full bg-navyBlue  items-center flex flex-row justify-between pl-16 pr-16 ">

        <div className="flex flex-row justify-center items-center gap-4">
          <img src="/uconn.png" className="h-[20px] w-auto" alt="UConnLogo" />
          <div className="border-l-2 border-[#3e4760] h-[20px]  items-center justify-center hidden md:visible md:flex ">
            <h1 className="  pl-4  cursor-pointer text-[17px] text-[#9faab2] text-center tracking-wider">UNIVERSITY OF CONNECTICUT</h1>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center  gap-8">
          <SearchIconHeader className=" cursor-pointer h-[20px] w-[20px]"></SearchIconHeader>
          <UConnAtoZIcon className=" cursor-pointer h-[20px] w-[20px]"></UConnAtoZIcon>
        </div>
      </div>

      <div className="mainBoxes text-Text pt-2 border-[#eff3f7]  font-bold top-0 left-0 w-full bg-foreground  items-center flex flex-row justify-center h-[52px] md:h-[145px]">
        <div className="ml-16 h-full w-full flex flex-col justify-center pb-2">
          <div className="md:mt-4">
            <h4 className="text-xs tracking-widest text-Text font-normal hidden md:visible md:flex ">COLLEGE OF ENGINEERING</h4>
            <div className="h-full md:w-fit">
              <h4 className="text-lg [word-spacing:3px] text-Text md:text-2xl">Student Course Scheduler</h4>
            </div>
        </div>

      <div className="relative mt-8 hidden md:visible md:flex">
      <h4
        className="text-md tracking-widest font-normal text-Text  cursor-pointer w-fit"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Credits
      </h4>

      {visible && (
        <h4
          className={`absolute top-12 text-md text-Text tracking-widest font-normal transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          Created by Eric Asante
        </h4>
      )}
      </div>

        </div>


      </div>


      <div className="min-w[300px] w-full max-w-7xl">

        <div className="grid grid-cols-1 grid-rows-[80px_1fr_1fr_1fr] xl:grid-cols-2 xl:grid-rows-[80px_1fr_1fr] w-full ">

          <div className="relative h-full flex justify-center w-1/2 justify-self-center self-center col-span-1 xl:col-span-2">

            <div className="relative h-fit w-full flex items-center justify-center ">


            </div>



          </div>

          <SearchBlock></SearchBlock>


          <Cart></Cart>

          <ScheduleBlock></ScheduleBlock>


          {ScheduleBlockStates.smallCalenderPopUpVisiablity && !ScheduleBlockStates.largeCalenderPopUpVisiablity? 
            <PopUpCalendar className={"absolute bottom-4 left-4 xs:bottom-8 xs:left-4 md:left-32 md:bottom-64 xl:bottom-8 xl:left-32"}></PopUpCalendar> 
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


      <div className=" h-20 text-xs xs:text-lg top-0 left-0 w-full bg-foreground pb-4 items-end flex flex-row justify-center gap-4 md:gap-12">
        <h1 className="">© University of Connecticut</h1>
        <h1 onClick={() => window.open( "https://uconn.edu/disclaimers-privacy-copyright/", "_blank")} className=" cursor-pointer">Disclaimers, Privacy, & Copyright</h1>
        <h1 onClick={() => window.open( "https://accessibility.uconn.edu", "_blank")} className=" cursor-pointer">Accessibility</h1>
      </div>

    </div>
  );
}
