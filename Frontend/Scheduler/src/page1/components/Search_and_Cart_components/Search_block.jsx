import Search_block_form from "./Search_block_components/filter/Search_block_form.jsx"


import Course_view from "./Search_block_components/result_view/course_view.jsx"


import { DataContext} from "../../../data/data.jsx";
import { useContext } from 'react';



function Search_block() {


    return (
        <div className=" drop-shadow-[-10px_15px_10px_rgba(0,0,0,0.5)] relative h-[50rem]  size-full flex flex-row divide-x-2 divide-black border-2 border-black ">

            <div className="bg-gray-100 w-full h-full flex flex-col  ">
                <div className=" bg-[F8F8F8] w-full h-[10%]">
                    <h1 className=" w-full h-full text-center items-center text-5xl flex justify-center font-semibold text-black md:text-3xl">Search Courses</h1>
                </div>

                <Search_block_form></Search_block_form>

            </div>
            


            <Course_view></Course_view>

        

        
        </div>
    )
  }
  
  export default Search_block
