import { useEffect,useState,useContext } from 'react';
import {DataContext} from "../../../../data/data.jsx";

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

    <div className="w-full h-[10%] p-2 bg-blue-200 mb-2 flex flex-row">

        <div className='flex flex-col w-full h-full'>
            <h1>{title}</h1>
            <h1>{course_information[0]["title"]}</h1>
        </div>



        {cart_status ? (

        <button className='bg-amber-300 h-full w-fit' >
            add
        </button>

        ) : (

        <button className='bg-red-300 h-full w-fit' onClick={transition_to_cart}>
            add
        </button>
        )}



    </div>

  )
}

export default course_card
