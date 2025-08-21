import { DataContext } from "@/data/Data"
import { useState, useContext, useEffect } from "react"
import { TrashIcon } from "@/app/Icons/Icons";
import { ToggleClassIcon } from "@/app/Icons/Icons";
import { InfoIcon } from "@/app/Icons/Icons";

export default function CartClassCard({CartClassName}) {
    const {CartStates} = useContext(DataContext);
    const [inclusionStatus, setInclusionStatus] = useState(false);
    
    console.log(inclusionStatus)
  return (

    <div className="relative bg-foreground h-16 rounded-md flex items-center justify-evenly">

        <div className="z-10 h-14 w-full opacity-50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        </div>

        <div className="aspect-square w-10">
            <InfoIcon></InfoIcon>
        </div>

        <div className="w-40">
            <h1 className="h-[32px] truncate "> {CartClassName}</h1>
        </div>

        <div className=" z-10 space-x-4 flex">
            <div className="aspect-square w-10 bg-amber-300">
            </div>
            <div className="aspect-square w-10 bg-red-300"></div>
        </div>  

        <div className=" z-10 space-x-4 flex">
            <button  onClick={() => {
                CartStates.changeClassInclusion(CartClassName)
                setInclusionStatus(!inclusionStatus)}}
                className={`aspect-square w-10 ${inclusionStatus ? 'bg-blue-300' : 'bg-amber-300'} ${CartStates.scheduling ? 'opacity-50' : ''}`} >


              <ToggleClassIcon></ToggleClassIcon>  
            </button>

            <button disabled={CartStates.scheduling} onClick={() => CartStates.removeFromCart(CartClassName)} className={`aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : ''}`}>
                <TrashIcon></TrashIcon>
            </button>
        </div>  
        

    </div>

  )}
