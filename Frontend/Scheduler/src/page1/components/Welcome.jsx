import { useContext, useState,useEffect } from "react"
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

  let count = 0
  const [Troll, setTroll] = useState(false)

  function troller(){
    if (count == 5){
      setTroll(true)
  
    } else {
      count += 1
    }
  }
  
  console.log(count)

  useEffect (() => {

  }, [Troll]
  )

  function close(){
    if (!(campus == "-" || semester == "-")){
      state(false)

    }
  }

  
    return (
      <div className="w-[50rem] h-[36rem]  flex flex-col  z-50 items-center absolute bg-gray-100 drop-shadow-[10px_15px_10px_rgba(0,0,0,0.5)] divide-black border-1 rounded-xl border-black p-4 space-y-6"> 
        <div className="w-full bg-[#000e2f] flex flex-col drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] items-center rounded-xl justify-center h-[20%]">
            <h1 className="text-5xl font-bold m-0.5">UCONN Course Scheduler</h1>
            <h1 onClick={troller} className="font-medium">"For students, by students"</h1>
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
              <h1 className="text-sm text-black mr-2">Developed by:</h1>

              <h1 className="text-sm text-black">
  <a href="https://www.linkedin.com/in/eric-asante-8a7275220" className="text-sm text-black hover:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
    Eric Asante
  </a>, <a href="https://www.linkedin.com/in/ethanthomas0/" className="text-sm text-black hover:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
    Ethan Thomas
  </a>, 
  <a href="https://www.linkedin.com/in/abeshan-javed-6ba1a7265/" className="text-sm text-black hover:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> Abeshan Javed
  </a>, and
  <a href="https://www.linkedin.com/in/joel-duah/" className="text-sm text-black hover:text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer"> Joel Duah
  </a>
  
</h1>




            </div>

            <div className="flex flex-row">


            <h1 className="text-sm text-black"></h1>
            </div>

        </div>


        <div>
              {Troll ? (
                <div className="h-full w-full">
                  <h1 className="text-black">All Hail the ReadME specialist Abeshan Javed</h1>
                  <h1 className="text-black">Joel Mr.fold-alot Duah</h1>
                </div>
              ) : null}
        </div>

      </div>
    )
  }
  
  export default Welcome