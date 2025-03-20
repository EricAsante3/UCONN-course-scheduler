import { useRef,useEffect,useState,useContext } from 'react';


import {DataContext} from "../../../../../data/data.jsx";

import Course_card from './course_card';

function course_view() {
    const {searched_data} = useContext(DataContext);
  return (

<div className="bg-gray-100 w-full h-full flex flex-col  divide-y-[0.25rem] p-2 overflow-y-auto hide-scrollbar">
  { Object.keys(searched_data).includes("defult") ? (

      <h1 className='text-black flex h-full w-full justify-center items-center'>Please apply atleast one filter.</h1>

  ) : Object.keys(searched_data).includes("none") ? (
      <h1 className='text-black flex h-full w-full justify-center items-center'>No courses found. Please refine your filters.</h1>
    
  ) : (
    Object.keys(searched_data).map((key) => (
      <Course_card className="h-auto"  key={key} title={key} course_information={searched_data[key]} />
    ))
  )}
</div>


    
    
  )

}

export default course_view
