import { DataContext } from '../../data/data';
import Schedule_card from './Schedule_components/Nav_bar/schedule_card'
import { useState,useContext, useEffect } from 'react'
import Welcome from './Welcome';
import { CircularProgress } from '@mui/material';






function Schedule_block() {
    const { availabilities_data, class_lock,api_url,session_id_user, valid_class_combinations,setvalid_class_combinations,cart_data,classes_combinations,init_search} = useContext(DataContext);
    const [page, setpage] = useState(0);
    const [page_dic, setpage_dic] = useState({});




    function left_handle() {
      if (page >= 10) {  // Ensuring `page - 10` is non-negative
        const newPage = page - 10;
        
        if (page_dic.hasOwnProperty(String(newPage))) {  // Check if key exists
          setvalid_class_combinations(page_dic[String(newPage)]);
        }
        
        setpage(newPage);
      }
    }


    function right_handle(){
      if (!("done"in page_dic)){
        setvalid_class_combinations(null)
      } else {
        if (String(page + 10) in page_dic && page_dic[String(page+10)] !== 0){
          setpage(page + 10)
          setvalid_class_combinations(page_dic[String(page + 10)])
          return 0
        } else {
          return 0
        }
      }



      const class_combinations_continue_post = async () => {    
        const response = await fetch(api_url + '/course_scheduler/combinations_maker_continue', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({session_id:session_id_user,lock:class_lock,ava:availabilities_data}), // Form data automatically sets the appropriate Content-Type
        });
        if (response.ok) {
          try{
            const responseData = await response.json(); // Parse the JSON response
            console.log(responseData)

            setpage(page + 10)
            setpage_dic(prevPageDic => ({
              ...prevPageDic,
              [String(page+10)]: responseData
            }));

            setvalid_class_combinations(responseData)
          }catch (error) {
            setvalid_class_combinations(page_dic[String(page)])
            setpage_dic(prevPageDic => ({
              ...prevPageDic,
              ["done"]: 0
            }));
          }
    
          } else {
            throw new Error('Failed to create schedule');
        }
    };
    
    class_combinations_continue_post()
    }







    console.log(page)

    useEffect(() => {
      setpage(0)
      setpage_dic({})
    }, [cart_data]);
    
    useEffect(() => {
      if (valid_class_combinations) {
        setpage_dic(prevPageDic => {
          // Check if "0" is already in the dictionary
          if ("0" in prevPageDic) {
            return prevPageDic; // Do nothing if "0" is already set
          }
          return { ...prevPageDic, [String(0)]: valid_class_combinations };
        });
      }
    }, [valid_class_combinations]); // Runs when valid_class_combinations updates

    useEffect(() => {
      console.log(page_dic)
      // Update the page_dic state if the key does not exist

    }, [page]); // Dependencies include valid_class_combination





    return (

      <div className="p-[2rem] w-full space-x-4 items-center justify-center  "> 


        <div className="p-[1rem] bg-[#000e2f] flex  rounded-xl flex-col items-center relative overflow-auto divide-black border-2 border-black w-full h-96">
        
  { valid_class_combinations === null? (

    <CircularProgress size={24} />
) : "fail" in valid_class_combinations? (
  <>
    <div className="w-full flex flex-col items-center rounded-xl mb-5 justify-center ">
      
    <h1 className='text-4xl mb-1 font-semibold text-white w-full  text-center'>Too Many Class Section Conflicts To Continue!</h1>
    <h1 className="text-lg font-medium"> (lock induviual class sections in class list one by one to generate more schedules)   </h1>

    </div>
    {Object.entries(valid_class_combinations["found"]).map(([key, value], index) => (
      <Schedule_card key={key} schedule_key={key} schedule_info={value} index={index + 1} />
    ))}    
  </>
) : Object.keys(valid_class_combinations).length >= 0 && init_search === false && Object.keys(cart_data).length > 1? (
  <>
    <div className="w-full flex flex-col items-center rounded-xl mb-5 justify-center ">
      <div className='flex flex-row justify-around'>
      <button className='bg-green-500' onClick={() => left_handle()}>left</button>
      <h1 className='text-4xl mb-1 font-semibold text-white w-full  text-center'>Possible Schedules found: {page+1} - {page+10}</h1>
      <button className='bg-red-500' onClick={() => right_handle()}>right</button>

      </div>
      <h1 className="text-sm font-medium"> (Consider locking class sections in schedule view to reduce possibilities and computation)   </h1>

    </div>


    
    {Object.entries(valid_class_combinations).map(([key, value], index) => (
      <Schedule_card key={key} schedule_key={key} schedule_info={value} index={index + 1 + page} />
    ))}

    <div className=' mb-56  w-full h-[800px]'></div>

  </>
) : Object.keys(valid_class_combinations).length >= 0 && init_search === false && Object.keys(cart_data).length === 1? (

  <>
    <div className="w-full flex flex-col items-center rounded-xl mb-5 justify-center ">
      <div className='flex flex-row justify-around'>
      <h1 className='text-4xl mb-1 font-semibold text-white w-full  text-center'>Possible Schedules found: {Object.keys(valid_class_combinations).length}</h1>

      </div>
      <h1 className="text-sm font-medium"> (Consider locking class sections in schedule view to reduce possibilities and computation)   </h1>

    </div>


    
    {Object.entries(valid_class_combinations).map(([key, value], index) => (
      <Schedule_card key={key} schedule_key={key} schedule_info={value} index={index + 1} />
    ))}

    <div className=' mb-56  w-full h-[800px]'></div>

  </>

) : Object.keys(valid_class_combinations).length === 0?(

  <h1 className='text-4xl font-semibold text-white w-full mb-5 text-center'>Generate Schedule!</h1>

):(

  <h1 className='text-4xl font-semibold text-white w-full mb-5 text-center'>Generate Schedule!</h1>
  
)}








        </div>
      
      </div>
    )

  }
  
  export default Schedule_block
  