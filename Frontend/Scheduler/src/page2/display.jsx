
import { useContext, useState } from "react";
import { DataContext } from "../data/data";
import CalendarApp from "./Viewer_pop_up/Calender";
import Classs_card from "./class_card";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Button, Modal, Box} from "@mui/material";
import Register_classes from '/src/page2/Register_classes.jsx';



function display() {
    const {temp_schedule,temp_events} = useContext(DataContext);
    console.log(temp_schedule)
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

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
        
        <div className="bg-[#4d7ff1] h-24 w-full p-2 pr-2 flex justify-between items-center">
        <div onClick={handleClick} className=" cursor-pointer h-full flex border-2 flex-col justify-center items-center border-black p-2  text-white rounded-xl">
                <ArrowLeftIcon className="text-white"></ArrowLeftIcon>
                <button className="text-white">Back to search</button>
            </div>
            <h1 className="text-4xl p-2 font-bold text-white">Schedule {temp_events["index"]}</h1>

            <div onClick={() => setOpen(true)} className=" cursor-pointer h-full flex border-2 flex-col justify-center items-center border-black p-2 text-white rounded-xl">
                <ShoppingCartIcon className="text-white"></ShoppingCartIcon>
                <button className="flex text-white" >
                    Register Classes
                </button>

            </div>
        </div>

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box
                sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "75%",
                width: "80%",
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                p: 4,
                maxHeight: "90vh",
                overflowY: "auto",
                }}
            >
                <Box sx={{  display: 'flex', flexDirection: 'column'}}>
                    <Register_classes classInfo={temp_schedule} />
                    <Button onClick={() => setOpen(false)} sx={{ mt: 'auto', mr: 'auto'}} variant="contained">
                    Close
                    </Button>
                </Box>
            </Box>
        </Modal>

        <CalendarApp schedule_info={temp_events}></CalendarApp>

        </div>

    </div>

    )
  }
  
  export default display