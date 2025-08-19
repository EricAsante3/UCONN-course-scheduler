import { AddToCartIcon } from "@/app/Icons/Icons"

export default function LeadClassCard({element}) {

    return (
        <div className="relative w-full h-16 bg-Highlight rounded p-2 mt-4 mb-8">
            <h1 className="h-[32px]">{element[0].subject} {element[0].catalogNbr}</h1>
            <p className="text-sm truncate w-[256px] h-[20px]">{element[0].title}</p>
            <AddToCartIcon className="aspect-square w-8 absolute top-1 right-3"/>
        </div>
    )
}
