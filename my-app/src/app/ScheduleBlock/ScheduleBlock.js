import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/data/Data"
import ScheduleCard from "./components/scheduleCard";

export default function ScheduleBlock() {
    const {ScheduleBlockStates} = useContext(DataContext);



    const [page, setPage] = useState(0);

    console.log(page)
    const pageSize = 10;

    const start = page * pageSize;
    const end = start + pageSize;


    const currentSchedules = ScheduleBlockStates.validSchedules["message"].slice(start, end);


    useEffect(() => {}, [page])


  return (
          <div className="col-span-2 p-4 h-[556px] min-h-[556px] ">
            
            <div className="bg-foreground grid grid-rows-[10%_90%] h-full rounded-2xl p-2 max-h-2xl overflow-y-scroll">
                <div className="h-full rounded-2xl bg-blue-400 flex items-center justify-evenly">
                    <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}className="rounded-full aspect-square w-10 bg-amber-300"></button>
                    <h1 className="text-4xl">Possible Schedules</h1>
                    <button           onClick={() => setPage((p) => (p + 1) * pageSize < ScheduleBlockStates.validSchedules["message"].length ? p + 1 : p)
          }  disabled={(page + 1) * pageSize >= ScheduleBlockStates.validSchedules["message"].length} className="rounded-full aspect-square w-10 bg-amber-300"></button>

                </div>

                <div className=" h-full  rounded-2xl text-black pt-4 overflow-y-scroll ">

                {currentSchedules.map((schedule, index) => (
                <ScheduleCard key={index} index={start + index + 1} schedule={schedule} />
                ))}
       

                </div>

            </div>





          </div>
  )}