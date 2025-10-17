import { useContext, useEffect, useState } from "react"
import { DataContext } from "@/data/Data"
import ScheduleCard from "./components/scheduleCard";
import Loader from "./components/loader";
import { SearchArrow } from "../Icons/Icons";
import { motion } from "framer-motion";

const MotionLoadingScheduleCard = motion(ScheduleCard);

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { x: -200, opacity: 0 },
  show: { 
    x: 0, 
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 150, damping: 20 },
      opacity: { duration: 0.6 } // fade speed
    }
  },
};


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
          <div className="col-span-1 p-4 h-[556px] min-h-[556px] justify-self-center xl:col-span-2 min-w-[500px] w-3/4 sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-full">
            
            <div className="bg-[#000e2f] text-white grid grid-rows-[15%_85%] h-full rounded-2xl p-2 max-h-2xl">
                <div className="h-full rounded-2xl flex items-center justify-evenly p-2">

                    { ScheduleBlockStates.validSchedules["status"] > 200 ? null  :
                      <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}className="rounded-full h-full w-28">
                        { page === 0 ? null :
                            <SearchArrow className="transform scale-x-[-1] cursor-pointer" ></SearchArrow>
                        }
                      </button>
                    }

                      <div className="  h-full w-full flex flex-col items-center justify-center ">
                        { ScheduleBlockStates.validSchedules["status"] === 200 ?   
                            ( ScheduleBlockStates.validSchedules["value"].length >= 200 ?
                              <h2 className="text-center text-lg w-fit font-bold xl:text-3xl">Possible Schedules: First Possible 200</h2> :
                              <h2 className="text-center text-lg w-fit font-bold xl:text-3xl">Possible Schedules: {ScheduleBlockStates.validSchedules["value"].length}</h2>
                            ) :

                          ScheduleBlockStates.validSchedules["status"] === 350 ? 

                            <h2 className=" text-center text-lg w-fit font-bold xl:text-3xl">Possible Schedules: (Time Limit Ecceded) returned {ScheduleBlockStates.validSchedules["value"].length} schedules</h2> :

                            <h2 className="text-center text-lg w-fit font-bold xl:text-3xl">Possible Schedules: 0</h2>
                        }

                        <h2 className="w-full opacity-70 text-center text-xs xl:text-lg">(Use section/professor lock to generate faster and explore more possibilities)</h2>
                      </div>

                    { ScheduleBlockStates.validSchedules["status"] > 200 ?   
                      null
                      :
                      <button           
                      onClick={() => setPage((p) => (p + 1) * pageSize < ScheduleBlockStates.validSchedules["value"].length ? p + 1 : p)}  
                      disabled={(page + 1) * pageSize >= ScheduleBlockStates.validSchedules["value"].length} 
                      className="rounded-full h-full w-28 cursor-pointer ">

                        { (page + 1) * pageSize >= ScheduleBlockStates.validSchedules["value"].length ? null :
                            <SearchArrow className="" ></SearchArrow>
                        }

                      </button>
                      
                    }

                </div>

                <div className=" h-full rounded-2xl text-black pt-4 overflow-y-scroll ">

                { ScheduleBlockStates.scheduling ? 

                  <Loader></Loader>

                :                
                ScheduleBlockStates.validSchedules["status"] > 200 ?
                
                  (ScheduleBlockStates.validSchedules["value"] === "Home" ? null : 

                    <div className="text-black text-3xl flex items-center justify-center flex-col bg-white h-32">
                      {ScheduleBlockStates.validSchedules["value"]}
                    </div>

                  )

                :
                  
                  <motion.div variants={containerVariants} initial="hidden" animate="show">
                    {currentSchedules.map((schedule, index) => (
                      <MotionLoadingScheduleCard
                        key={index}
                        index={start + index + 1}
                        schedule={schedule}
                        variants={cardVariants}
                      />
                    ))}
                  </motion.div>
                }

                </div>

            </div>

          </div>
  
  )}