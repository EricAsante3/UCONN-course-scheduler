import { DataContext } from '../../data/data';
import Schedule_card from './Schedule_components/Nav_bar/schedule_card'
import { useState,useContext, useEffect } from 'react'

function Schedule_block() {
    const { valid_class_combinations,setvalid_class_combinations,cart_data,classes_combinations } = useContext(DataContext);
    const [count, setCount] = useState(0);

    useEffect(() => {

    }, [valid_class_combinations]);
    return (

      <div className="p-[2rem] w-full  bg-blue-500 space-x-4 items-center justify-center"> 
      


        <div className="p-[1rem] bg-green-800 flex flex-col items-center relative overflow-auto divide-black border-4 border-black w-full h-96">
        
        {Object.keys(classes_combinations).length === 0 && Object.keys(valid_class_combinations).length === 0 && Object.keys(cart_data).length > 0 ? (
  <div className="flex items-center justify-center h-full">Conflicts Found In Class List</div>
) : Object.keys(valid_class_combinations).length > 0 ? (
  <>
    <h1>Possible Schedules found:</h1>
    {Object.entries(valid_class_combinations).map(([key, value], index) => (
      <Schedule_card key={key} schedule_key={key} schedule_info={value} index={index + 1} />
    ))}
    <div className='bg-amber-900 mb-56  w-full h-[800px]'></div>

  </>
) : (
  <h1>Schedules:</h1>
)}










        </div>
      
      </div>
    )

  }
  
  export default Schedule_block
  