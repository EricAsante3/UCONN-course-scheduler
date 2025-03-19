import { DataContext } from '../../data/data';
import Schedule_card from './Schedule_components/Nav_bar/schedule_card'
import { useState,useContext, useEffect } from 'react'

function Schedule_block() {
    const { valid_class_combinations,setvalid_class_combinations } = useContext(DataContext);
    const [count, setCount] = useState(0);

    useEffect(() => {

      console.log("classes_combinations------------------")

    }, [valid_class_combinations]);
    
    return (

      <div className="p-[2rem] w-full  bg-blue-500 space-x-4 items-center justify-center"> 
      


        <div className="p-[1rem] bg-green-800 flex flex-col items-center relative overflow-auto divide-black border-4 border-black w-full h-96">
          <h1>Possible Schedules:</h1>


          {Object.entries(valid_class_combinations).map(([key, value], index) => (
                <Schedule_card key={key} schedule_key={key} schedule_info={value} index={index +  1} />
            ))}




        </div>
      
      </div>
    )

  }
  
  export default Schedule_block
  