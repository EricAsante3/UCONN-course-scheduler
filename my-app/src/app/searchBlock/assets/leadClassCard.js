import { AddToCartIcon } from "@/app/Icons/Icons"
import { CartSingleton } from "@/data/Data"
import { useContext } from "react";
import { DataContext } from "@/data/Data";

export default function LeadClassCard({element}) {
    const {SearchBlockStates} = useContext(DataContext);

    return (
        <div id="smallBoxes" className={`relative w-full h-16 rounded p-2 mt-4 mb-8 ${SearchBlockStates.scheduling ? "pointer-events-none" : "cursor-pointer bg-Highlight"}`} onClick={() => {
                if (SearchBlockStates.scheduling) return
                if (CartSingleton.inCartCheck(element[0].subject + " " + element[0].catalogNbr)) return

                const output = SearchBlockStates.appendToCart(element[0].subject + " " + element[0].catalogNbr, element)
                console.log(output)
            }}>



            <h2 className="h-[32px] font-bold">{element[0].subject} {element[0].catalogNbr}</h2>
            <p className="text-sm truncate w-[256px] h-[20px] opacity-70">{element[0].title}</p>
            { CartSingleton.inCartCheck(element[0].subject + " " + element[0].catalogNbr) ? <AddToCartIcon className="aspect-square w-8 absolute top-1 right-3 fill-greenColor"/> : <AddToCartIcon className="aspect-square w-8 absolute top-1 right-3"/>}
        </div>
    )
}
