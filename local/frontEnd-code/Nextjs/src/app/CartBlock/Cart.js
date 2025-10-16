import { use, useContext, useEffect, useState } from "react"
import CartClassCard from "./components/classCard"
import { DataContext } from "@/data/Data"
import { SunMoon } from "../Icons/Icons";
import { motion } from "framer-motion";


const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
}

export default function Cart() {
    const {CartStates} = useContext(DataContext);
    const classesInCart = CartStates.cartElements
    const [theme, setTheme] = useState(0)

    useEffect(() => setTheme(document.body.classList.contains("light")))

    return (
    <div className="mainBoxes relative grid grid-rows-[10%_75%_15%] bg-foreground aspect-square rounded-2xl min-w-xl w-xl row-span-1 col-span-1 justify-self-center text-2xl xl:mb-0">
        <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }} onClick={() => {

            if (document.body.classList.contains("light")) {
                document.body.classList.remove("light");
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark")
                setTheme(false)

            } else {
                document.body.classList.remove("dark");
                document.body.classList.add("light");
                localStorage.setItem("theme", "light")
                setTheme(true)
            }

        }} 
        className="absolute cursor-pointer -right-8 -top-8 h-16 w-16 "
        aria-label="Sun/Moon Icon">

        <SunMoon theme={theme}></SunMoon>
        </motion.button>

        
        <div className="w-full pr-8 pl-8  flex items-center justify-between bg-foreground rounded-2xl ">
            

            { classesInCart.includes("BREAK") ?
                <div >
                </div>                
                :
                <div className="cursor-pointer" onClick={() => {CartStates.setBreakViewPopup(true)}}>
                    <motion.h2 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="text-Text text-3xl font-bold">+ Personal Break</motion.h2>
                </div>
            }







            { 8 > classesInCart.length ?
                <div className="flex flex-row space-x-2 text-3xl font-bold">
                    <h2 className="text-greenColor">{classesInCart.length}</h2>
                    <h2>/</h2>
                    <h2>8</h2>
                </div> 
            :
                <div className="flex flex-row space-x-2">
                    <h1 className="text-red-400">{classesInCart.length}</h1>
                    <h1 className="text-red-400">/</h1>
                    <h1 className="text-red-400">8</h1>
                </div> 
            }

        </div>

        <div className="relative w-full p-2 space-y-4 overflow-y-scroll bg-Highlight">
            
            







            {classesInCart.map((element, index) =>  <CartClassCard key={index} CartClassName={element}/>)
                    }




        </div>

        <div className="flex items-center justify-center w-full p-4 bg-foreground rounded-2xl">
            <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.2 }} disabled={CartStates.scheduling} onClick={() => {CartStates.ScheduleGeneration()
                scrollToBottom()
            }}   className={`mainBoxes text-4xl font-bold bg-navyBlue h-full w-5/6 rounded-full text-white ${ CartStates.scheduling || CartStates.generationHold ? "opacity-50" : "opacity-100 cursor-pointer"}`}>
                Schedule
            </motion.button>
        </div>
    </div>



  )}