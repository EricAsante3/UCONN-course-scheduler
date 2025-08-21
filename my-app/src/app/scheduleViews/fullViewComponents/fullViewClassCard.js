import { DataContext } from "@/data/Data";
import { useContext } from "react";
import { LockIcon } from "@/app/Icons/Icons";


function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



export default function FullViewClassCard({classData}) {
    const {ScheduleBlockStates} = useContext(DataContext);
    const color = ScheduleBlockStates.returnClassColor(classData.className)
    
  return (
        <div className="w-full h-24 bg-navyBlue p-2 text-white rounded-2xl" style={{ border: `1px solid ${hexToRgba(color, 0.8)}` }}>        
            <div className="bg-black h-3/6 w-full rounded-full flex items-center justify-evenly">
                <h1 className="text-2xl w-28 text-center">{classData.className}</h1>
                <button className="aspect-square w-6 flex items-center justify-center">
                    <LockIcon />
                </button>
            </div>

            <div className="mr-2 ml-2 flex flex-row justify-between">
                <p>Seats: {classData.seats}</p>
                <p>Registration #: {classData.crn}</p>
            </div>
            
            <p className="ml-2 w-[252px] truncate">Prof: {classData.Prof}</p>
        </div>
  )}