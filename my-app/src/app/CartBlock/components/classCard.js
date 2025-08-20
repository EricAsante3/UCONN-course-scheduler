import { DataContext } from "@/data/Data"
import { useState, useContext, useEffect } from "react"

export default function CartClassCard({CartClassName}) {
    const {CartStates} = useContext(DataContext);
    const [inclusionStatus, setInclusionStatus] = useState(false);
    
    console.log(inclusionStatus)
  return (

    <div className="relative bg-blue-500 h-16 rounded-md flex items-center justify-evenly">

        <div className="z-10 h-14 w-full opacity-50 border border-amber-300 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">

        </div>

        <div className="aspect-square w-10 bg-amber-300"></div>

        <div className="w-40">
            <h1 className="h-[32px] truncate "> {CartClassName}</h1>
            <p className="text-sm truncate w-40 h-[20px]">gggggggggggggggggggggggggggggggggggggggggggggg</p>
        </div>

        <div className=" z-10 space-x-4 flex">
            <div className="aspect-square w-10 bg-amber-300"></div>
            <div className="aspect-square w-10 bg-red-300"></div>
        </div>  

        <div className=" z-10 space-x-4 flex">
            <button onClick={() => {CartStates.changeClassInclusion(CartClassName)
                setInclusionStatus(!inclusionStatus)
            }} className={`aspect-square w-10 ${inclusionStatus ? 'bg-blue-300' : 'bg-amber-300'}`} ></button>
            <button   onClick={() => CartStates.removeFromCart(CartClassName)} className="aspect-square w-10 bg-red-500">ii</button>
        </div>  
        

    </div>

  )}
