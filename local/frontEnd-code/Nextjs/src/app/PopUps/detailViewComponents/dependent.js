import { ScheduleObjectToString } from "@/classObjects/helperFunctions"
export function Dependent ({dependentSectionData}) {
    return (
            <div className="w-full min-h-[50px] pr-2 pl-2">
                <h1>Section: {dependentSectionData.crn}</h1>
                <h1 className=" text-center">Meeting Time: {ScheduleObjectToString(dependentSectionData.time)}</h1>
            </div>
    )
}