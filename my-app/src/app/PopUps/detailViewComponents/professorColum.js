import { MainComponent } from "./mainComponent"
import { LockIconUnlocked } from "@/app/Icons/Icons"
import { useState, useContext } from "react"
import { DataContext } from "@/data/Data"
import { LockIconLocked } from "@/app/Icons/Icons"
import { motion } from "framer-motion"


export function ProfessorColum({professorName, sectionData, className, states}) {
        const {CartStates} = useContext(DataContext);
        console.log(className)
    return (
                <div id="smallBoxes" className="rounded-2xl flex flex-col h-full w-[400px] bg-foreground">
                  <div className="rounded-2xl  w-full bg-Highlight h-20 flex items-center justify-center">
                    <h2 className="text-2xl font-semibold w-4/5 truncate text-Text">{professorName}</h2>




                    { sectionData.open.length > 0 ?



                    (!(CartStates.viewProfessorConstraint(className) === professorName) ?
                        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} onClick={() => {
                            CartStates.professorConstraintAdder(className, professorName)
                            states[1](!states[0])
                            }} className="aspect-square w-8 flex items-center justify-center">
                            <LockIconUnlocked ></LockIconUnlocked>
                        </motion.button>
                        :
                        <button className="aspect-square w-8 flex items-center justify-center">
                            <LockIconLocked></LockIconLocked>
                        </button>)

                    :
                            null

                    }










                  </div>


                  <div className="h-full w-full flex flex-col p-4 space-y-12  overflow-y-scroll items-center">
                  


                
                    {sectionData.open.map((value, index) => {
                        return <MainComponent key={index} primarySectionData={value}></MainComponent>
                    })}

                    <div className="w-2/3 h-px border-b border-redColor/50" />


                    {sectionData.closed.map((value, index) => {
                        return <MainComponent key={index} primarySectionData={value}></MainComponent>
                    })}

                  </div>






                </div>
    )
}