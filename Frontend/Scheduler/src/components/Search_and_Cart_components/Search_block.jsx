import Search_block_form from "./Search_block_components/filter/Search_block_form.jsx"


import Course_view from "./Search_block_components/result_view/course_view.jsx"


import { DataContext} from "../../data/data.jsx";
import { useContext } from 'react';



function Search_block() {
    const { setsearched_data} = useContext(DataContext);


    return (
        <div className="h-[50rem] size-full flex flex-row divide-x-[0.25rem] divide-black border-4 border-black ">
            
            <div className="bg-gray-100 w-full h-full flex flex-col divide-y-[0.25rem] divide-black">
                <div className=" bg-[F8F8F8] w-full h-[10%]">
                    <h1 className=" w-full h-full text-center items-center text-5xl flex justify-center  text-black ">Search Courses</h1>
                </div>

                <Search_block_form></Search_block_form>

            </div>
            


            <Course_view></Course_view>

        

        
        </div>
    )
  }
  
  export default Search_block
