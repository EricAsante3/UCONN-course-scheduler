import { DataContext } from "@/data/Data"
import { useState, useContext, useEffect, useRef } from "react"
import { ToggleClassIconOff, TrashIcon } from "@/app/Icons/Icons";
import { ToggleClassIconOn } from "@/app/Icons/Icons";
import { InfoIcon } from "@/app/Icons/Icons";
import { LockIconLocked } from "@/app/Icons/Icons";
import { LockIconUnlocked } from "@/app/Icons/Icons";
import { UserLockIconClosed } from "@/app/Icons/Icons";
import { UserLockIconOpen } from "@/app/Icons/Icons";
import { UserLockIcon } from "@/app/Icons/Icons";
import { motion } from "framer-motion";


export default function CartClassCard({CartClassName}) {
    const {CartStates} = useContext(DataContext);
    const [inclusionStatus, setInclusionStatus] = useState(false);
    const [locked, setlocked] = useState(false);
    const [snapshot, setSnapshot] = useState(CartStates.Campus);


    let color;



    if (CartClassName !== "BREAK" ) {
        color = CartStates.returnClassColor(CartClassName)
    }

  return (


    <>
    { CartClassName !== "BREAK" ?

    

    <div id="smallBoxes" className="relative bg-foreground h-16 rounded-md flex items-center justify-evenly">


        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => {
            CartStates.setDetailedViewPopUpVisiablity(true) 
            CartStates.setDetailedViewContent(CartStates.detailedViewPreProccesor(CartClassName))
            }} className="aspect-square w-10 group relative cursor-pointer">

            <div className=" opacity-70 text-xs  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                <h1 className="font-bold">P/S View</h1>
            </div>

            <InfoIcon></InfoIcon>
        </motion.div>

        <div className="w-40 h-full relative flex  items-center justify-center flex-col">
            <h1 className="h-[32px] truncate "> {CartClassName}</h1>
            <h2 className=" absolute bottom-1 truncate text-xs font-extralight"> ({snapshot})</h2>
        </div>




        <div className=" z-10 space-x-4 flex relative">

            {CartStates.viewProfessorConstraint(CartClassName) === "" ?

                <button disabled={CartStates.scheduling} className={`relative group aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : ''}`}>
                    <UserLockIcon className="fill-Text"></UserLockIcon>

                    <div className=" opacity-70 text-xs  bg-Highlight border border-Text absolute w-40  rounded-2xl top-11 text-center -left-15 invisible group-hover:visible">
                        <h1 className="font-bold">Prof Lock</h1>
                        <h1>(Enable in P/S View)</h1>
                    </div>

                </button>

                :
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} disabled={CartStates.scheduling} onClick={() => {
                    CartStates.professorConstraintRemover(CartClassName)
                    setlocked(!locked)
                    }} className={`group relative aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'}`}>
                    <UserLockIconClosed className="fill-Text"></UserLockIconClosed>

                    <div className=" opacity-70 text-xs flex flex-col items-center justify-center  bg-Highlight border border-Text absolute w-40  rounded-2xl top-11 text-center -left-15 invisible group-hover:visible">
                        <h1 className="font-bold">Prof Lock</h1>
                        <h1 className="max-w-28  text-center truncate">Locked: {CartStates.viewProfessorConstraint(CartClassName)} </h1>
                    </div>


                </motion.button>
            }

            {CartStates.viewSectionConstraint(CartClassName) === "" ?

                <button disabled={CartStates.scheduling} className={`group relative aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : ''}`}>
                    <LockIconUnlocked></LockIconUnlocked>
                    <div className=" opacity-70 text-xs  bg-Highlight border border-Text absolute w-40  rounded-2xl top-11 text-center -left-15 invisible group-hover:visible">
                        <h1 className="font-bold">Section Lock</h1>
                        <h1>(Enable in Schedule View)</h1>
                    </div>
                </button>

                :
                <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} disabled={CartStates.scheduling} onClick={() => {
                    CartStates.sectionConstraintRemover(CartClassName)
                    setlocked(!locked)
                    }} className={`group relative aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'}`}>
                    <LockIconLocked></LockIconLocked>
                    <div className=" opacity-70 text-xs  bg-Highlight border border-Text absolute w-32  rounded-2xl top-11 text-center -left-11 invisible group-hover:visible">
                        <h1 className="font-bold">Section Lock</h1>
                        <h1>(Locked: {CartStates.viewSectionConstraint(CartClassName)})</h1>
                    </div>
                </motion.button>
            }


        </div>  

        <div className=" z-10 space-x-4 flex">
            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} disabled={CartStates.scheduling}  onClick={() => {
                CartStates.changeClassInclusion(CartClassName)
                setInclusionStatus(!inclusionStatus)}}
                className={`group relative aspect-square w-10 ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'
                }`} >

                { inclusionStatus ? 
                    <>
                        <ToggleClassIconOff></ToggleClassIconOff>

                        <div className=" space-x-2 opacity-70 text-xs items-center justify-center flex  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                            <h1>Inclusion:</h1>
                            <h1 className="font-bold">Off</h1>
                        </div>
                    </>
                :
                    <>
                        <ToggleClassIconOn fill={color}></ToggleClassIconOn>

                        <div className=" space-x-2 opacity-70 text-xs items-center justify-center flex  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                                <h1>Inclusion:</h1>
                                <h1 className="font-bold">On</h1>
                        </div>
                    </>
                }

            </motion.button>






            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} disabled={CartStates.scheduling} onClick={() => CartStates.removeFromCart(CartClassName)} className={` group relative aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'}`}>
                <div className=" opacity-70 text-xs  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                    <h1 className="font-bold">Remove</h1>
                </div>
                <TrashIcon></TrashIcon>
            </motion.button>
        </div>  
        

    </div>
    :
    <div id="smallBoxes" className="relative bg-foreground h-16 rounded-md flex items-center justify-evenly">


        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}  onClick={() => {CartStates.setBreakViewPopup(true)}} className="group relative aspect-square w-10 cursor-pointer">
                
            <InfoIcon></InfoIcon>
            <div className=" opacity-70 text-xs  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                <h1 className="font-bold">Edit Breaks</h1>
            </div>
        </motion.div>
        <div className="w-56">
            <h1 className="h-[32px] truncate ">Personal Break</h1>
        </div>

        <button disabled={CartStates.scheduling} className={`aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : ''}`}>
        </button>


         <div className=" z-10 space-x-4 flex">

            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} disabled={CartStates.scheduling}  onClick={() => {

                CartStates.changeClassInclusion("BREAK")
                setInclusionStatus(!inclusionStatus)

            }}
                className={`group relative aspect-square w-10 ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'
                }`} >








                { inclusionStatus ? 
                    <>
                        <ToggleClassIconOff></ToggleClassIconOff>

                        <div className=" space-x-2 opacity-70 text-xs items-center justify-center flex  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                            <h1>Inclusion:</h1>
                            <h1 className="font-bold">Off</h1>
                        </div>

                    </>
                :
                    <>
                        <ToggleClassIconOn ></ToggleClassIconOn>

                        <div className=" space-x-2 opacity-70 text-xs items-center justify-center flex  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                            <h1>Inclusion:</h1>
                            <h1 className="font-bold">On</h1>
                        </div>

                    </>
                }

                
            </motion.button>

            <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} disabled={CartStates.scheduling} onClick={() => {
                CartStates.removeFromCart("BREAK")
                }} className={`relative group aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'}`}>


                <div className=" opacity-70 text-xs  bg-Highlight border border-Text absolute w-24  rounded-2xl top-10 text-center -left-7 invisible group-hover:visible">
                    <h1 className="font-bold">Remove</h1>
                </div>

                <TrashIcon></TrashIcon>
            </motion.button>
        </div>

        
    </div>
    }
    </>
  )}
