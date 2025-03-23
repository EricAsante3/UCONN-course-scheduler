import { DataContext } from '../../data/data';
import Schedule_card from './Schedule_components/Nav_bar/schedule_card'
import { useState,useContext, useEffect } from 'react'
import Welcome from './Welcome';
import { CircularProgress } from '@mui/material';

function Schedule_block() {
    const { valid_class_combinations,setvalid_class_combinations,cart_data,classes_combinations,init_search} = useContext(DataContext);
    const [count, setCount] = useState(0);

    useEffect(() => {

    }, [valid_class_combinations]);
    return (

      <div className="p-[2rem] w-full space-x-4 items-center justify-center  "> 


        <div className="p-[1rem] bg-[#000e2f] flex  rounded-xl flex-col items-center relative overflow-auto divide-black border-2 border-black w-full h-96">
        
  { valid_class_combinations === null? (

    <CircularProgress size={24} />
) : Object.keys(valid_class_combinations).length >= 0 && init_search === false? (
  <>
    <div className="w-full flex flex-col items-center rounded-xl mb-5 justify-center ">
      <div className='flec flex-row'>
        <h1 className='text-4xl mb-1 font-semibold text-white w-full  text-center'>Possible Schedules found: {Object.keys(valid_class_combinations).length}</h1>


      </div>
      <h1 className="text-sm font-medium"> (Consider locking class sections in schedule view to reduce possibilities and computation)   </h1>

    </div>


    
    {Object.entries(valid_class_combinations).map(([key, value], index) => (
      <Schedule_card key={key} schedule_key={key} schedule_info={value} index={index + 1} />
    ))}





    
    <div className=' mb-56  w-full h-[800px]'></div>

  </>
) : (

  <h1 className='text-4xl font-semibold text-white w-full mb-5 text-center'>Generate Schedule!</h1>
  
)}








        </div>
      
      </div>
    )

  }
  
  export default Schedule_block
  