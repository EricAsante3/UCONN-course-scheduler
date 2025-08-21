import { useContext } from "react";
import { DataContext } from "@/data/Data";


export default function ScheduleCard({schedule, index}) {
  const {ScheduleBlockStates} = useContext(DataContext);
  return (
    <div 
    onClick={() => {
      ScheduleBlockStates.setLargeCalenderPopUpVisiablity(true)
      ScheduleBlockStates.setCurrentScheduleLargePopUp(schedule)
    }}

    onMouseEnter={() => {
      ScheduleBlockStates.setCurrentScheduleSmallPopUp(ScheduleBlockStates.popUpSchedulerBuilder(schedule))
      ScheduleBlockStates.setSmallCalenderPopUpVisiablity(true)
    }} 
    
    onMouseLeave={() => ScheduleBlockStates.setSmallCalenderPopUpVisiablity(false)}
    
    
    className=" h-14 bg-white rounded-2xl text-black flex items-center justify-center mb-4">
        <h1 className="text-2xl">Schedule {index}</h1>
    </div>
  )}