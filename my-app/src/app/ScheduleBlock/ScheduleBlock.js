import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/data/Data"
import ScheduleCard from "./components/scheduleCard";
import Loader from "./components/loader";

export default function ScheduleBlock() {
    const {ScheduleBlockStates} = useContext(DataContext);


    let currentSchedules = []
    const [page, setPage] = useState(0);
    const pageSize = 10;
    const start = page * pageSize;
    const end = start + pageSize;

    if (!(ScheduleBlockStates.validSchedules["status"] > 200)) {
      if (ScheduleBlockStates.validSchedules["value"].length > 0) {
          currentSchedules = ScheduleBlockStates.validSchedules["value"].slice(start, end);
      }
    }


    useEffect(() => {}, [page])
    useEffect(() => {setPage(0)}, [ScheduleBlockStates.scheduling])

  return (
          <div className="col-span-2 p-4 h-[556px] min-h-[556px] ">
            
            <div className="bg-foreground grid grid-rows-[15%_85%] h-full rounded-2xl p-2 max-h-2xl overflow-y-scroll">
                <div className="h-full rounded-2xl bg-blue-400 flex items-center justify-evenly p-2">



                    { ScheduleBlockStates.validSchedules["status"] > 200 ? null  :
                      <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}className="rounded-full aspect-square w-10 bg-amber-300">
                      </button>
                    }


                      
                      <div className="  h-full w-full flex flex-col items-center justify-center">
                        { ScheduleBlockStates.validSchedules["status"] === 200 ?   
                            ( ScheduleBlockStates.validSchedules["value"].length >= 200 ?
                              <h1 className="text-4xl w-fit">Possible Schedules: First Possible 200</h1> :
                              <h1 className="text-4xl w-fit">Possible Schedules: {ScheduleBlockStates.validSchedules["value"].length}</h1>
                            ) :

                            

                          ScheduleBlockStates.validSchedules["status"] === 350 ? 

                            <h1 className="text-4xl w-fit">Possible Schedules: (Time Limit Ecceded) returned {ScheduleBlockStates.validSchedules["value"].length} schedules</h1> :

                            <h1 className="text-4xl w-fit">Possible Schedules: 0</h1>
                        }

                        <p className="w-fit">(Consider using section/professor lock feature for faster generation and finding more schedules)</p>
                      </div> 

                    



                    { ScheduleBlockStates.validSchedules["status"] > 200 ?   
                      null
                      :<button           
                      onClick={() => setPage((p) => (p + 1) * pageSize < ScheduleBlockStates.validSchedules["value"].length ? p + 1 : p)}  
                      disabled={(page + 1) * pageSize >= ScheduleBlockStates.validSchedules["value"].length} 
                      className="rounded-full aspect-square w-10 bg-amber-300">
                      </button>
                    }





                </div>

                <div className=" h-full rounded-2xl text-black pt-4 overflow-y-scroll ">









                { ScheduleBlockStates.scheduling ? 
                
                
                  <Loader></Loader>

                :                
                ScheduleBlockStates.validSchedules["status"] > 200 ?   
                  <div>
                    {ScheduleBlockStates.validSchedules["value"]}
                  </div>
                :
                  (currentSchedules.map((schedule, index) => (
                    <ScheduleCard key={index} index={start + index + 1} schedule={schedule} />
                  )))
                }








                </div>

            </div>





          </div>
  )}