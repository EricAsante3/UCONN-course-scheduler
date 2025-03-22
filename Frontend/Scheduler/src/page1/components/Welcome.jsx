import { useContext } from "react"
import Search from "./Search_and_Cart_components/Search_block_components/filter/searchbar"

import { DataContext } from "../../data/data"

const Campus = [
  "-",
  "Storrs",
  "Stamford",
  "Hartford",
  "Waterbury",
  "Avery Point",
  "School of Law"
]

const Semester = [
  "-",
  "Fall 2025",
  "Summer 2025"
]




function Welcome({state}) {

    const { campus, set_campuss, semester, set_semester} = useContext(DataContext);

  function close(){
    if (!(campus == "-" || semester == "-")){
      state(false)

    }
  }

  
    return (
      <div className="w-[50rem] h-[36rem]  flex flex-col  z-50 items-center absolute bg-gray-100 drop-shadow-[10px_15px_10px_rgba(0,0,0,0.5)] divide-black border-1 rounded-xl border-black p-4 space-y-6"> 
        <div className="w-full bg-[#000e2f] flex flex-col drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] items-center rounded-xl justify-center h-[20%]">
            <h1 className="text-5xl font-bold m-0.5">UCONN Course Scheduler</h1>
            <h1 className="font-medium">"For students, Made by students"</h1>
        </div>



        <div  className="w-full border-2 p-2 rounded-xl drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] bg-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold text-black mb-4">Please Select Campus:</h1>
            <Search filter={campus} setfilter={set_campuss} options={Campus}></Search>
        </div>

        <div  className="w-full border-2 p-2 rounded-xl drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] bg-white flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold text-black mb-4">Please  Select Term:</h1>
            <Search filter={semester} setfilter={set_semester} options={Semester}></Search>
        </div>

        <div className="w-full border-2 text-center border-black p-2 text-black rounded-xl mb-4 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] bg-white" >
            <button className="text-5xl  font-bold text-black " onClick={close}>START</button>
        </div>


        <div className="w-full text-center " >
            <div className="flex flex-row">
              <h1 className="text-sm text-black mr-2">Developers:</h1>
              <h1 className="text-sm text-black">Eric Asante and Ethan Thomas</h1>
            </div>


            <div className="flex flex-row">
            <h1 className="text-sm text-black mr-2">UI/UX Designers:</h1>
            <h1 className="text-sm text-black">Joel Duah and Abeshan Javed</h1>
            </div>

        </div>

      </div>
    )
  }
  
  export default Welcome