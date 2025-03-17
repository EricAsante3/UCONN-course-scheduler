import { useRef,useEffect,useState,useContext } from 'react';


import {DataContext} from "../../../../data/data.jsx";

import Course_card from './course_card';

function course_view() {
    const {searched_data} = useContext(DataContext);


  return (

    <div className="bg-purple-950 w-full h-full flex flex-col divide-y-[0.25rem] divide-black overflow-y-auto hide-scrollbar">

    {Object.keys(searched_data).map((key) => (
        
            <Course_card key={key} title={key} course_information={searched_data[key]}></Course_card>

        ))}
        
    </div>

    
    
  )

}

export default course_view
