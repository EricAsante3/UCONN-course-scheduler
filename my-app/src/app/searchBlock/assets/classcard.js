import { AddToCartIcon } from "@/app/Icons/Icons"
import { CartSingleton } from "@/data/Data"
import { useContext } from "react";
import { DataContext } from "@/data/Data";

export default function ClassCard({element}) {
    const {SearchBlockStates} = useContext(DataContext);




    return (
        <div onClick={() => {
                if (SearchBlockStates.scheduling) return
                if (CartSingleton.inCartCheck(element[0].subject + " " + element[0].catalogNbr)) return

                const output = SearchBlockStates.appendToCart(element[0].subject + " " + element[0].catalogNbr, element)
                console.log(output)
            }} 
            className={`relative w-full h-16 rounded p-2 mt-4 ${SearchBlockStates.scheduling ? "pointer-events-none opacity-50 bg-pink-400" : "cursor-pointer bg-Highlight"}`}>

            <h1 className="h-[32px]">{element[0].subject} {element[0].catalogNbr} {element[0].campus} </h1>
            <p className="text-sm truncate w-[256px] h-[20px]">{element[0].title}</p>
            <AddToCartIcon className="aspect-square w-8 absolute top-1 right-3"/>
            { CartSingleton.inCartCheck(element[0].subject + " " + element[0].catalogNbr) ? <div className="bg-red-300">sdad</div> : null}
        </div>
    )
}
