import { useEffect,useState,useContext } from 'react';
import {DataContext} from "../../../../../data/data.jsx";
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


    function pop_up(){
        let link = "https://catalog.uconn.edu/search/?search=" + title.split(" ").join("+") + "&caturl=%2Facademic-calendar"
        window.open(link, '_blank')
    }



  return (

    <div className="w-full line-clamp-2 min-h-[11%] hover:min-h-[13%] hover:mb-6  h-auto max-h-none p-2  mb-2 flex flex-row border bg-[#ffffff] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 text-gray-900">

        <div className='flex flex-col w-full '>
            <h1 onClick={pop_up}  className="text-lg cursor-pointer hover:text-xl hover:text-[#0424a4]  text-start font-bold">{title}</h1>
            <h1 className=' text-start  '>{course_information[Object.keys(course_information)[0]]["title"]}</h1>

        </div>



        {cart_status ? (

            <PlusCircleIcon className=' text-green-300 cursor-pointer ml-2 flex items-center justify-center    h-full w-fit'>

            </PlusCircleIcon>

        ) : (

            <PlusCircleIcon onClick={transition_to_cart} className='text-gray-500 ml-2 cursor-pointer flex items-center justify-center h-full w-fit'>

            </PlusCircleIcon>



        )}



    </div>

  )
}

export default course_card
