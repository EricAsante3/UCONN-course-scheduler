import { useContext, useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline"; // Import the icon
import CalendarApp from '../Viewer_pop_up/Calender'


function Schedule_card() {
  const [popup,set_popup] = useState(false);


    return (

      <div
      
      onMouseEnter={() => set_popup(true)}
      onMouseLeave={() => set_popup(false)}



      className={`bg-red-800 w-[90%] mb-4 h-16 flex flex-row p-2 items-center justify-center divide-black border-4 border-black
      ${
        popup ? 'cursor-pointer' : 'cursor-default'
      }`}      
      
      
      > 




          <div className="relative">



          { popup &&
            (<div className="absolute left-60 -top-6 ">
              <CalendarApp ></CalendarApp>
            </div>)
          }


          </div>



          <div className="w-full h-full flex items-center justify-center">
          <EyeIcon className="h-full mr-5">
          </EyeIcon>

            SCHEDULE ?
          </div>

      </div>
    )
  }

export default Schedule_card