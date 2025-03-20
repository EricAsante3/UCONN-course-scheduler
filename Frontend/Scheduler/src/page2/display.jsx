
import { useContext } from "react";
import { DataContext } from "../data/data";
import CalendarApp from "./Viewer_pop_up/Calender";
import Classs_card from "./class_card";
import { useNavigate } from "react-router-dom";

function display() {
    const {temp_schedule,temp_events} = useContext(DataContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
      };


    return (
    
    
    <div className="p-2 flex flex-col">

        <div className="bg-amber-500 w-full">
        {temp_schedule[0].map((item, index) => (
            <Classs_card key={index} class_info={item} ></Classs_card>
            ))}
        </div>

        <div>

        <button onClick={handleClick}>BACK BUTTON</button>
        <CalendarApp schedule_info={temp_events}></CalendarApp>

        </div>


    </div>

    )
  }
  
  export default display