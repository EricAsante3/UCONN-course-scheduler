import { useRef,useEffect,useState } from 'react';

function course_card({title, course_information}) {


    


  return (

    <div className="w-full h-[10%] p-2 bg-blue-200 mb-2 flex flex-row">

        <div className='flex flex-col w-full h-full'>
            <h1>{title}</h1>
            <h1>{course_information[0]["title"]}</h1>
        </div>

        <button className='bg-amber-300 h-full w-fit'>
            add
        </button>
    </div>

  )
}

export default course_card
