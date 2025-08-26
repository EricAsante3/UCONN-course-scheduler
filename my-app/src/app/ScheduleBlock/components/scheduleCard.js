import { useContext } from "react";
import { DataContext } from "@/data/Data";
import { CalenderICon } from "@/app/Icons/Icons";

export default function ScheduleCard({schedule, index}) {
  const {ScheduleBlockStates} = useContext(DataContext);
  return (
    <div 
    onClick={() => {
      ScheduleBlockStates.setLargeCalenderPopUpVisiablity(true)
      ScheduleBlockStates.setCurrentScheduleLargePopUp({"calenderNumber": index, "scheduleData": schedule})
    }}

    onMouseEnter={() => {
      ScheduleBlockStates.setCurrentScheduleSmallPopUp(ScheduleBlockStates.popUpSchedulerBuilder(schedule))
      ScheduleBlockStates.setSmallCalenderPopUpVisiablity(true)
    }} 
    
    onMouseLeave={() => ScheduleBlockStates.setSmallCalenderPopUpVisiablity(false)}
    
    
    className=" cursor-pointer h-16 bg-white rounded-2xl text-black flex items-center justify-center mb-4 space-x-4 hover:border-2 border-red-500">
        <div className="aspect-square w-10">
          <CalenderICon></CalenderICon>
        </div>
        <h2 className="text-2xl font-bold">Schedule {index}</h2>
    </div>
  )}