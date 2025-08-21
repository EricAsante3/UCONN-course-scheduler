import { useContext } from "react"
import CartClassCard from "./components/classCard"
import { DataContext } from "@/data/Data"

export default function Cart() {
    const {CartStates} = useContext(DataContext);
    const classesInCart = CartStates.cartElements
    return (

    <div className="relative grid grid-rows-[10%_75%_15%] bg-foreground aspect-square rounded-2xl min-w-xl w-xl row-span-1 col-span-1 justify-self-center text-2xl">


        
        <div className="w-full pr-8 pl-8  flex items-center justify-between">
            <h1>+ add break</h1>
            { 8 > classesInCart.length ?
                <div className="flex flex-row space-x-2">
                    <h1 className="text-green-400">{classesInCart.length}</h1>
                    <h1>/</h1>
                    <h1>8</h1>
                </div> 
            :
                <div className="flex flex-row space-x-2">
                    <h1 className="text-red-400">{classesInCart.length}</h1>
                    <h1 className="text-red-400">/</h1>
                    <h1 className="text-red-400">8</h1>
                </div> 
            }

        </div>

        <div className="w-full p-2 space-y-4 overflow-y-scroll">
            
            
            {classesInCart.map((element, index) => (
                <CartClassCard key={index} CartClassName={element} />
            ))}




        </div>

        <div className="w-full p-2">
            <button onClick={() => {CartStates.ScheduleGeneration()}} className="bg-blue-500 h-full w-full rounded-full">
                generate
            </button>
        </div>
    </div>



  )}