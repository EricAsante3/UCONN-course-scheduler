
import { useContext } from "react";
import { DataContext } from "../data/data";
import CalendarApp from "./Viewer_pop_up/Calender";
import Classs_card from "./class_card";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';


function display() {
    const {temp_schedule,temp_events} = useContext(DataContext);
    console.log(temp_schedule)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/");
      };


    return (

    
    <div className="p-2 flex flex-col">

        <div className="w-full p-2 pr-2">
        {temp_schedule[0].map((item, index) => (
            <Classs_card key={index} class_info={item} ></Classs_card>
            ))}
        </div>

        <div>
        
        <div className="bg-blue-500 h-24 w-full p-2 pr-2 flex justify-between items-center">
        <div onClick={handleClick} className=" cursor-pointer h-full flex border-2 flex-col justify-center items-center border-black p-2  text-black rounded-xl">
                <ArrowLeftIcon></ArrowLeftIcon>
                <button >Back to search</button>
            </div>
            <h1 className="text-4xl p-2 font-bold text-black">Schedule {temp_events["index"]}</h1>

            <div className=" cursor-pointer h-full flex border-2 flex-col justify-center items-center border-black p-2 text-black rounded-xl">
                <ShoppingCartIcon></ShoppingCartIcon>
                <button className="flex" onClick={handleClick}>Register Classes</button>
            </div>
        </div>
        <CalendarApp schedule_info={temp_events}></CalendarApp>

        </div>


    </div>

    )
  }
  
  export default display