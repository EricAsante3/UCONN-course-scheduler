import { Dependent } from "./dependent"
import { ScheduleObjectToString } from "@/classObjects/helperFunctions"

export function MainComponent({primarySectionData}) {


    return (
        <div id="smallBoxes" className="w-full bg-background min-h-36  flex flex-col space-y-2 items-center rounded-2xl">
            <div className="w-full h-1/2   grid grid-cols-[33%_43%_23%] grid-rows-[20%_80%] ">
            <div className="col-span-3 row-span-1 flex flex-row w-full justify-evenly">
                <h1>Section: {primarySectionData.classSection}</h1>
                <h1>Crn: {primarySectionData.completeSectionCrn}</h1>
                { primarySectionData.sectionAvailableSeats > 0 ?
                    <h1>Seats Open: {primarySectionData.sectionAvailableSeats}</h1>
                    :
                    <div className="bg-redColor/50 rounded-2xl pl-4 pr-4 h-fit">
                        <h1 className="">Section Full</h1>
                    </div>

                }
                

            </div>
                <div className="col-span-3 flex flex-col items-center justify-center w-full">
                    <h1 className=" text-center">Meeting Time: {ScheduleObjectToString(primarySectionData.time)}</h1>
                    <h1 className=" text-center">{primarySectionData.instructionMode}</h1>
                </div>
            </div>


            {primarySectionData.dependentSections.length > 0
            ? primarySectionData.dependentSections.map((value, index) => (
                <div key={index}>
                    <div className="w-2/3 h-px border-b border-Text/20" />
                    <Dependent key={index} dependentSectionData={value} />
                </div>
                ))
            : null}



        </div>
    )
}