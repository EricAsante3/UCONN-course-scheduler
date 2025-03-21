import { useContext, useState } from "react";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline"; // Import the icon
import CalendarApp from '../Viewer_pop_up/Calender'
import { useNavigate } from "react-router-dom";


function Schedule_card({schedule_key, schedule_info, index }) {
  const [popup,set_popup] = useState(false);
  const navigate = useNavigate();
  
  let result = ''; // Initialize an empty string

  for (let i = 0; i < schedule_info[0].length; i++) {
    if (schedule_info[0][i][0].meets === "Online Instruction" || schedule_info[0][i][0].meets === "By Arrangement" || schedule_info[0][i][0].meets === "Does Not Meet"){
        result += schedule_info[0][i][0].code + " - " + schedule_info[0][i][0].meets + ", "; // Concatenate each element to the string
    }
  }

  const handleClick = () => {


    navigate("/display");
  };



    return (

      <div
      
      onMouseEnter={() => { set_popup(true); }}
      onMouseLeave={() => set_popup(false)}



      className={`bg-white w-[90%] mb-4 h-16 flex flex-row p-2 items-center justify-center divide-black border-2 border-black
      ${
        popup ? 'cursor-pointer' : 'cursor-default'
      }`}      
      
      
      > 




          <div className="relative">



          { popup &&
            (<div className="absolute left-60 -top-6 ">
              <CalendarApp schedule_info={schedule_info} index={index} ></CalendarApp>
            </div>)
          }


          </div>



          <div className="w-full h-full flex items-center justify-center text-black" onClick={handleClick}>
          <CalendarDateRangeIcon className="h-full mr-5"></CalendarDateRangeIcon>

            SCHEDULE {index} {result}
          </div>

      </div>
    )
  }

export default Schedule_card