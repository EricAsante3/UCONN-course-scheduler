import { DataContext } from "@/data/Data"
import { useState, useContext, useEffect } from "react"
import { ToggleClassIconOff, TrashIcon } from "@/app/Icons/Icons";
import { ToggleClassIconOn } from "@/app/Icons/Icons";
import { InfoIcon } from "@/app/Icons/Icons";
import { LockIconLocked } from "@/app/Icons/Icons";
import { LockIconUnlocked } from "@/app/Icons/Icons";







export default function CartClassCard({CartClassName}) {
    const {CartStates} = useContext(DataContext);
    const [inclusionStatus, setInclusionStatus] = useState(false);
    const [locked, setlocked] = useState(false);

    const color = CartStates.returnClassColor(CartClassName)

    console.log(inclusionStatus)
  return (

    <div id="smallBoxes" className="relative bg-foreground h-16 rounded-md flex items-center justify-evenly">


        <div onClick={() => {
            CartStates.setDetailedViewPopUpVisiablity(true) 
            CartStates.setDetailedViewContent(CartStates.detailedViewPreProccesor(CartClassName))
            }} className="aspect-square w-10 cursor-pointer">
                
            <InfoIcon></InfoIcon>
        </div>

        <div className="w-40">
            <h1 className="h-[32px] truncate "> {CartClassName}</h1>
        </div>

        <div className=" z-10 space-x-4 flex">

            



            {CartStates.viewProfessorConstraint(CartClassName) === "" ?

                <button disabled={CartStates.scheduling} className={`aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : ''}`}>
                    <LockIconUnlocked></LockIconUnlocked>
                </button>

                :
                <button disabled={CartStates.scheduling} onClick={() => {
                    CartStates.professorConstraintRemover(CartClassName)
                    setlocked(!locked)
                    }} className={`aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'}`}>
                    <LockIconLocked></LockIconLocked>
                </button>
            }






            {CartStates.viewSectionConstraint(CartClassName) === "" ?

                <button disabled={CartStates.scheduling} className={`aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : ''}`}>
                    <LockIconUnlocked></LockIconUnlocked>
                </button>

                :
                <button disabled={CartStates.scheduling} onClick={() => {
                    CartStates.sectionConstraintRemover(CartClassName)
                    setlocked(!locked)
                    }} className={`aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'}`}>
                    <LockIconLocked></LockIconLocked>
                </button>
            }


        </div>  

        <div className=" z-10 space-x-4 flex">
            <button disabled={CartStates.scheduling}  onClick={() => {
                CartStates.changeClassInclusion(CartClassName)
                setInclusionStatus(!inclusionStatus)}}
                className={`aspect-square w-10 ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'
                }`} >

                { inclusionStatus ? 
                    <ToggleClassIconOff></ToggleClassIconOff>
                :
                    <ToggleClassIconOn fill={color}></ToggleClassIconOn>
                }

                
            </button>






            <button disabled={CartStates.scheduling} onClick={() => CartStates.removeFromCart(CartClassName)} className={`aspect-square w-10  ${CartStates.scheduling ? 'opacity-50' : 'cursor-pointer'}`}>
                <TrashIcon></TrashIcon>
            </button>
        </div>  
        

    </div>

  )}
