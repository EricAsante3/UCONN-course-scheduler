import FullCalendar from "../scheduleViews/scheduleFullView";
import FullViewClassCard from "../scheduleViews/fullViewComponents/fullViewClassCard";
import { DataContext } from "@/data/Data";
import { useContext, useRef, useState } from "react";
import { DownloadIcon } from "../Icons/Icons";
import { Enroll } from "../Icons/Icons";
import { CloseSquareIcon } from "../Icons/Icons";
import { CalenderICon } from "../Icons/Icons";
import html2canvas from "html2canvas";
import { SearchArrow } from "../Icons/Icons";
import { motion } from "framer-motion";
import { RatingIcon } from "../Icons/Icons";

export default function FullSchedulePopUp() {
    const {ScheduleBlockStates} = useContext(DataContext);
    const componentRef = useRef();
    const classData = ScheduleBlockStates.FullCalenderClassCardProccessing(ScheduleBlockStates.currentScheduleLargePopUp.scheduleData)
    const [instructionView, setInstructionView] = useState(false)

    const saveAsJPEG = () => {
        html2canvas(componentRef.current).then((canvas) => {
        // Convert canvas to JPEG
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg", 1.0); // 1.0 = quality
        link.download = "Schedule" + ScheduleBlockStates.currentScheduleLargePopUp.calenderNumber + ".jpeg";
        link.click();
        });
    };

    return (

        <>

            <div className="fixed inset-0 bg-black/50 z-30 "></div>

            <div  ref={componentRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  flex items-center justify-center min-h-[900px]">
            <div className="relative grid grid-cols-[270px_1124px] gap-4   w-fit p-4 h-[900px] min-h-[900px]">

                <div className="space-y-4">
                    {classData.map((classSection, index) => {

                        return <FullViewClassCard key={index} classData={classSection}></FullViewClassCard>
                        })
                    }
                </div>
                

                <h2 className="text-white absolute left-78 font-bold  -top-10 text-5xl">
                    Schedule View
                </h2>

                <motion.div onClick={() => window.open( "https://docs.google.com/forms/d/e/1FAIpQLSevzH1_VFX_uiLqEGiyjHPNMWfOdAt0G6P5K6m40-1vsEGqSA/viewform?usp=dialog", "_blank")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="flex flex-row  rounded-4xl items-center justify-center space-x-4 text-white absolute  h-5 w-64 right-20 font-bold  -top-4 text-5xl cursor-pointer">
                    <div className=" ">
                    <RatingIcon></RatingIcon>

                    </div>
                    <div className="flex items-center justify-center">
                        <h2 className="text-sm text-white">Leave A Review</h2>
                    </div>
                </motion.div>

                { instructionView ?

            
                <div className=" bg-navyBlue  text-white rounded-2xl">

                    <div className=" flex items-center justify-between relative h-[60px] w-full pr-12 pl-12">

                        <div className="flex flex-row space-x-4 items-center justify-center">
                            <div onClick={() => setInstructionView(false)} className="relative aspect-square w-12 cursor-pointer ">
                                <SearchArrow className="scale-x-[-1]"></SearchArrow>
                            </div>
                            <h2 className="text-4xl font-bold">Instructions</h2>
                        </div>

                        <div className="flex space-x-24">

                            <div className="flex items-center justify-center">
                                <div className="aspect-square w-10 "></div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="aspect-square w-10 "></div>
                            </div>

                        </div>

                        <button onClick={() => {ScheduleBlockStates.setLargeCalenderPopUpVisiablity(false)}} className="aspect-square w-14 cursor-pointer">
                            <CloseSquareIcon></CloseSquareIcon>
                        </button>
                        
                    </div>

                    <div className="h-[766px] flex flex-row items-center justify-center p-4 space-x-6">



                        <div className="h-full text-white bg-black w-96 grid grid-rows-[10%_20%_70%] rounded-2xl">
                            <div className=" flex items-center p-4 flex-col space-y-2">
                                <h1 className="text-4xl">Step 1:</h1>
                                <div className="border border-b opacity-30 h-px w-full"/>
                            </div>

                            <div className="flex flex-col p-4 text-center opacity-80">
                                <h1>Log in to Student Admin and click Manage Classes.</h1>
                            </div>

                            <div className="flex flex-col items-center justify-around h-full ">
                                <div >
                                    <img src="/UCONN-Course-Scheduler/step1.png" alt="Logo" width={500} height={500} />
                                </div>

                            </div>

                        </div>








                        <div className="h-full bg-black text-white w-96 grid grid-rows-[10%_20%_70%] rounded-2xl">

                            <div className=" flex items-center p-4 flex-col space-y-2">
                                <h1 className="text-4xl">Step 2:</h1>
                                <div className="border border-b opacity-30 h-px w-full"/>
                            </div>

                            <div className="flex flex-col p-4 text-center opacity-80">
                                <h1>Navigate to Class Search and Enroll.</h1>

                                <h1>
                                <span style={{ color: "red" }}>!</span> Make sure the correct term is selected. <span style={{ color: "red" }}>!</span>
                                </h1>                                
                            </div>

                            <div className="flex flex-col items-center justify-around h-full ">
                                <div >
                                    <img src="/UCONN-Course-Scheduler/step2.png" alt="Logo" width={500} height={500} />
                                </div>

                            </div>

                        </div>





                        <div className="h-full text-white bg-black w-96 grid grid-rows-[10%_20%_70%] rounded-2xl">

                            <div className=" flex items-center p-4 flex-col space-y-2">
                                <h1 className="text-4xl">Step 3:</h1>
                                <div className="border border-b opacity-30 h-px w-full"/>
                            </div>

                            <div className="flex flex-col p-4 text-center opacity-80">
                                <h1>Copy and paste the Registration #/CRN from the class cards on the left-hand panel into the search box.</h1>
                            </div>

                            <div className="flex flex-col items-center justify-around h-full ">
                                <div style={{ height: 200, overflow: "hidden" }}>
                                    <img src="/UCONN-Course-Scheduler/step3.png" alt="Logo" width={500} height={500} />
                                </div>

                                <div style={{ height: 200, overflow: "hidden" }}>
                                    <img src="/UCONN-Course-Scheduler/step4.png" alt="Logo" width={400} height={400} />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
                :

                <div className=" bg-navyBlue  text-white rounded-2xl">

                    <div className=" flex items-center justify-between relative h-[60px] w-full pr-12 pl-12">

                        <div className="flex flex-row space-x-4 items-center justify-center">
                            <div className="aspect-square w-10">
                            <CalenderICon></CalenderICon>
                            </div>
                            <h2 className="text-4xl font-bold">Schedule {ScheduleBlockStates.currentScheduleLargePopUp.calenderNumber}</h2>
                        </div>

                        <div className="flex space-x-24">

                            <div  className="flex items-center justify-center space-x-4">
                                <DownloadIcon onClick={() => (saveAsJPEG())} className="aspect-square w-10 cursor-pointer "></DownloadIcon>
                                <p className="text-sm opacity-70">Download</p>
                            </div>

                            <div  className="flex items-center justify-center space-x-4">
                                <Enroll onClick={() => setInstructionView(true)} className="aspect-square w-10 cursor-pointer "></Enroll>
                                <p className="text-sm opacity-70">Register Classes</p>
                            </div>

                        </div>

                        <button onClick={() => {ScheduleBlockStates.setLargeCalenderPopUpVisiablity(false)}} className="aspect-square w-14 cursor-pointer">
                            <CloseSquareIcon></CloseSquareIcon>
                        </button>
                        
                    </div>

                <FullCalendar></FullCalendar>
                </div>

                }








            </div>

            </div>

        </>

    )
}






