import { CloseSquareIcon } from "../Icons/Icons"
import { useContext, useState } from "react"
import { DataContext } from "@/data/Data"
import { ProfessorColum } from "./detailViewComponents/professorColum";

export default function DetailViewPopUp() {
    const {CartStates} = useContext(DataContext);
    const [locked, setlocked] = useState(false)

    

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-30 "></div>

            <div className="mainBoxes w-[600px] rounded-2xl bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  flex flex-col items-center justify-between h-[1000px] min-h-[900px] xl:w-[1394px] xl:min-w-[1394px]">
            


              <div className=" w-2/3 h-full flex flex-col justify-between border-b border-Text/45">
                <div className="relative w-full ">
                  <div className="mt-10">
                    <h2 className="text-4xl text-center font-bold">{CartStates.detailedViewContent["generalInfo"].className}</h2>
                    <h2 className="text-2xl text-center">{CartStates.detailedViewContent["generalInfo"].title}</h2>
                    <h2 className="text-center">{CartStates.detailedViewContent["generalInfo"].units} Credits * {CartStates.detailedViewContent["generalInfo"].academicCareer} * {CartStates.detailedViewContent["generalInfo"].campus}</h2>
                  </div>


                  <button onClick={() => {CartStates.setDetailedViewPopUpVisiablity(false)}} className="absolute top-8 right-0 aspect-square w-14 z-50">
                      <CloseSquareIcon></CloseSquareIcon>
                  </button>


                </div>
                <div>
                  <h2 className="text-4xl text-center">Professors/Sections View</h2>
                </div>
              </div>

              <div className="max-w-full h-[700px] min-h-[700px] overflow-x-auto flex space-x-4 p-4">


                {Object.entries(CartStates.detailedViewContent).map(([key, value]) => {
                      if (key !== "generalInfo"){
                        return <ProfessorColum key={key} professorName={key} sectionData={value} className={CartStates.detailedViewContent.generalInfo.className} states={[locked, setlocked]}></ProfessorColum>
                      }
                    }
                )}

              </div>
            </div>
        </>
    )
}

