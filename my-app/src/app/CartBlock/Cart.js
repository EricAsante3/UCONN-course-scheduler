import { useContext, useEffect } from "react"
import CartClassCard from "./components/classCard"
import { DataContext } from "@/data/Data"





export default function Cart() {
    const {CartStates} = useContext(DataContext);
    const classesInCart = CartStates.cartElements
    return (

    <div id="mainBoxes" className="relative grid grid-rows-[10%_75%_15%] bg-foreground aspect-square rounded-2xl min-w-xl w-xl row-span-1 col-span-1 justify-self-center text-2xl">
        <button onClick={() => {

            if (document.body.classList.contains("light")) {
                document.body.classList.remove("light");
                document.body.classList.add("dark");
                localStorage.setItem("theme", "dark")

            } else {
                document.body.classList.remove("dark");
                document.body.classList.add("light");
                localStorage.setItem("theme", "light")
            }

        }} 
        className="absolute -right-25 h-12 w-24 bg-amber-200">

        </button>

        
        <div className="w-full pr-8 pl-8  flex items-center justify-between bg-foreground rounded-2xl ">
            

            { classesInCart.includes("BREAK") ?
                <div >
                </div>                
                :
                <div className="cursor-pointer" onClick={() => {CartStates.setBreakViewPopup(true)}}>
                    <h2 className="text-Text text-3xl font-bold">+ Personal Break</h2>
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

        <div className="w-full p-2 bg-foreground rounded-2xl">
            <button onClick={() => {CartStates.ScheduleGeneration()}} className="bg-blue-500 h-full w-full rounded-full">
                generate
            </button>
        </div>
    </div>



  )}