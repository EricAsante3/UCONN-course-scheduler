import FullCalendar from "../scheduleViews/scheduleFullView";
import FullViewClassCard from "../scheduleViews/fullViewComponents/fullViewClassCard";
import { DataContext } from "@/data/Data";
import { useContext } from "react";
import { DownloadIcon } from "../Icons/Icons";
import { Enroll } from "../Icons/Icons";
import { CloseSquareIcon } from "../Icons/Icons";
import { CalenderICon } from "../Icons/Icons";


export default function FullSchedulePopUp() {
    const {ScheduleBlockStates} = useContext(DataContext);

    const classData = ScheduleBlockStates.FullCalenderClassCardProccessing(ScheduleBlockStates.currentScheduleLargePopUp.scheduleData)
    return (

        <>

            <div className="fixed inset-0 bg-black/50 z-30 "></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  flex items-center justify-center min-h-[900px]">
            <div className=" grid grid-cols-[270px_1124px] gap-4   w-fit p-4 h-[900px] min-h-[900px]">

                <div className="space-y-4">
                    {classData.map((classSection, index) => {

                        return <FullViewClassCard key={index} classData={classSection}></FullViewClassCard>


                        })
                    }
                </div>


                <div className=" bg-navyBlue  text-white rounded-2xl">

                    <div className=" flex items-center justify-between relative h-[60px] w-full pr-12 pl-12">

                        <div className="flex flex-row space-x-4 items-center justify-center">
                            <div className="aspect-square w-10">
                            <CalenderICon></CalenderICon>
                            </div>
                            <h1 className="text-4xl">Schedule {ScheduleBlockStates.currentScheduleLargePopUp.calenderNumber}</h1>
                        </div>


                        <div className="flex space-x-24">

                            <div className="flex items-center justify-center">
                                <DownloadIcon className="aspect-square w-10 "></DownloadIcon>
                                <p className="text-sm">Download</p>
                            </div>

                            <div className="flex items-center justify-center">
                                <Enroll className="aspect-square w-10 "></Enroll>
                                <p className="text-sm">Register Classes</p>
                            </div>




                        </div>

                        <button onClick={() => {ScheduleBlockStates.setLargeCalenderPopUpVisiablity(false)}} className="aspect-square w-14">
                            <CloseSquareIcon></CloseSquareIcon>
                        </button>
                        
                    </div>

                <FullCalendar></FullCalendar>
                </div>
            </div>

            </div>

        </>

    )
}






