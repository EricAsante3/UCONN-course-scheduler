import { useEffect,useState,useContext } from 'react';
import {DataContext} from "../../../../data/data.jsx";
import { PlusCircleIcon } from '@heroicons/react/24/outline'

function course_card({title, course_information}) {
    const {transition_data,settransition_data,cart_data} = useContext(DataContext);
    const [cart_status, set_cart_status] = useState(0);

    useEffect(() => {
        if (title in cart_data) {
            set_cart_status(1)
        } else {
            set_cart_status(0)
        }
    }, [cart_data]); 

    const transition_to_cart = () => {
        if (!(title in cart_data)) {
            settransition_data([...transition_data, {[title]:course_information}]);
        }
    };
  return (

    <div className="w-full min-h-[10%] h-fit max-h-fit p-2  mb-2 flex flex-row border bg-[#ffffff] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 text-gray-900">

        <div className='flex h-fit max-h-fit flex-col w-full '>
            <h1 className="mr-1 text-lg font-bold">{title}</h1>
            <h1 className='h-fit max-h-fit'>{course_information[Object.keys(course_information)[0]]["title"]}</h1>

        </div>



        {cart_status ? (

            <PlusCircleIcon className=' text-green-300  h-full w-fit'>

            </PlusCircleIcon>

        ) : (

            <PlusCircleIcon onClick={transition_to_cart} className='text-gray-500 h-full w-fit'>

            </PlusCircleIcon>



        )}



    </div>

  )
}

export default course_card
