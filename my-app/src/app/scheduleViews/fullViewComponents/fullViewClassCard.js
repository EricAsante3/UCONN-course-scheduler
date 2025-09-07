import { DataContext } from "@/data/Data";
import { useContext, useState } from "react";
import { LockIconUnlocked } from "@/app/Icons/Icons";
import { LockIconLocked } from "@/app/Icons/Icons";
import { motion } from "framer-motion";

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}



export default function FullViewClassCard({classData}) {
    const [locked, setlocked] = useState(false);
    const {ScheduleBlockStates} = useContext(DataContext);
    let color
    if (classData.className !== "BREAK"){
        color = ScheduleBlockStates.returnClassColor(classData.className)
    }    

  return (
        <>
        
        
        {classData.className !== "BREAK" ? 
        <div className="w-full h-fit bg-navyBlue p-2 text-white rounded-2xl" style={{ border: `1px solid ${hexToRgba(color, 0.8)}` }}>        
            <div className=" bg-black h-3/6 w-full rounded-full flex items-center justify-evenly">
                <h2 className="text-2xl w-40 text-center">{classData.className}</h2>
                {ScheduleBlockStates.viewSectionConstraint(classData.className) === "" ?
                    <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }} onClick={() => {
                        ScheduleBlockStates.sectionConstraintAdder(classData.className, classData.crn)
                        setlocked(!locked)
                        }} className="relative aspect-square w-8 flex items-center justify-center cursor-pointer group">
                        <LockIconUnlocked ></LockIconUnlocked>


                        <div className=" opacity-90 text-xs text-Text  bg-Highlight border border-Text absolute w-24  rounded-2xl top-14 text-center -left-12 invisible group-hover:visible">
                            <h1 className="font-bold">Lock Section?</h1>
                        </div>


                    </motion.button>
                    :
                    <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }} onClick={() => {
                        ScheduleBlockStates.sectionConstraintRemover(classData.className)
                        setlocked(!locked)
                        }} className="aspect-square w-8 flex items-center justify-center cursor-pointer group">
                        <LockIconLocked></LockIconLocked>


                        <div className=" opacity-90 text-xs text-Text bg-Highlight border border-Text absolute w-24  rounded-2xl top-14 text-center -left-12 invisible group-hover:visible">
                            <h1 className="font-bold">Section Locked</h1>
                        </div>


                    </motion.button>
                    }


            </div>

            <div className="mr-2 ml-2 mt-1 flex flex-row justify-between">
                <p className="opacity-80">Seats: {classData.seats}</p>
                <p className="font-semibold">Registration #: {classData.crn}</p>
            </div>
            <p className="opacity-80 ml-2 w-[252px] truncate">{classData.instructionMode}</p>

            <p className="opacity-80 ml-2 w-[252px] truncate">Prof: {classData.Prof}</p>
        </div>

        : 



        <div className="w-full h-fit bg-navyBlue p-2 text-white rounded-2xl ">        
            <div className="bg-black h-3/6 w-full rounded-full flex items-center justify-evenly">
                <h1 className="text-2xl w-28 text-center">Break</h1>
            </div>

            <div className="mr-2 ml-2 flex flex-row justify-between">
                <p></p>
                <p></p>
            </div>
            <p className="ml-2 w-[252px] truncate"></p>

            <p className="ml-2 w-[252px] truncate"></p>
        </div>


        }
        </>

  )}