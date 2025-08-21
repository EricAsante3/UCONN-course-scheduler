import { AddToCartIcon } from "@/app/Icons/Icons"
import { CartSingleton } from "@/data/Data"
import { useContext } from "react";
import { DataContext } from "@/data/Data";

export default function ClassCard({element}) {
    const {SearchBlockStates} = useContext(DataContext);




    return (
        <div id="smallBoxes" onClick={() => {
                if (SearchBlockStates.scheduling) return
                if (CartSingleton.inCartCheck(element[0].subject + " " + element[0].catalogNbr)) return

                const output = SearchBlockStates.appendToCart(element[0].subject + " " + element[0].catalogNbr, element)
                console.log(output)
            }} 
            className={`relative w-full h-16 rounded p-2 mt-4 ${SearchBlockStates.scheduling ? "pointer-events-none" : "cursor-pointer bg-Highlight"}`}>


            <h1 className="h-[32px]">{element[0].subject} {element[0].catalogNbr}</h1>
            <p className="text-sm truncate w-[256px] h-[20px]">{element[0].title}</p>
            { CartSingleton.inCartCheck(element[0].subject + " " + element[0].catalogNbr) ? <AddToCartIcon className="aspect-square w-8 absolute top-1 right-3 fill-green-400"/> : <AddToCartIcon className="aspect-square w-8 absolute top-1 right-3"/>}
        </div>
    )
}
