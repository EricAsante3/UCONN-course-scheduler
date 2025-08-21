import FullCalendar from "../scheduleViews/scheduleFullView";
import FullViewClassCard from "../scheduleViews/fullViewComponents/fullViewClassCard";
import { DataContext } from "@/data/Data";
import { useContext } from "react";


export default function FullSchedulePopUp() {
    const {ScheduleBlockStates} = useContext(DataContext);
    const classData = ScheduleBlockStates.FullCalenderClassCardProccessing(ScheduleBlockStates.currentScheduleLargePopUp)
    return (

        <>

            <div className="fixed inset-0 bg-black/50 z-30"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  flex items-center justify-center min-h-[900px]">
            <div className=" grid grid-cols-[270px_1124px] gap-4   w-fit p-4 h-[900px] min-h-[900px]">

                <div className="space-y-4">
                    {classData.map((classSection, index) => {

                        return <FullViewClassCard key={index} classData={classSection}></FullViewClassCard>


                        })
                    }
                </div>


                <div className="bg-blue-200">
                <div className="h-[70px] ">

                    <button onClick={() => {ScheduleBlockStates.setLargeCalenderPopUpVisiablity(false)}} className="aspect-square w-12 bg-black">
                        hg
                    </button>

                </div>
                <FullCalendar></FullCalendar>
                </div>
            </div>

            </div>

        </>

    )
}






