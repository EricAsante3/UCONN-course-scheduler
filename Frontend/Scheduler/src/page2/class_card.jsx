import { common } from '@mui/material/colors';
import { useState,useContext,useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { DataContext } from '../data/data';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';



function stringToLightHex(s) {
    // Create a hash of the string using CryptoJS
    const hashValue = CryptoJS.MD5(s).toString();

    // Convert parts of the hash to RGB values
    const r = (parseInt(hashValue.slice(0, 2), 16) % 106) + 150; // Ensure 150-255 range
    const g = (parseInt(hashValue.slice(2, 4), 16) % 106) + 150;
    const b = (parseInt(hashValue.slice(4, 6), 16) % 106) + 150;

    // Convert to hex format
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}




const handleClick = () => {
    set_class_lock((prevState) => ({
      ...prevState,  // Spread the old state to retain its values
      newKey: 'newValue',  // Add the new key-value pair
    }));
  };





function class_card({class_info}) {
    const { class_lock, set_class_lock } = useContext(DataContext);


    const handleClick = () => {
        set_class_lock((prevState) => ({
          ...prevState,  // Spread the old state to retain its values
          [class_info[0].code]: parseInt(class_info[class_info.length - 1].crn),  // Use square brackets for dynamic keys
        }));
      };

      useEffect(() => {

      }, [class_lock]); 

    const color = stringToLightHex(class_info[0].code.replace(/ /g, "_") + class_info[0].title)
    return (
        <div className=" w-full border-2 border-black p-2 text-black rounded-xl mb-4 drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)] bg-white" >







            <div className="p-2 text-lg rounded-xl font-bold text-black flex flex-row items-center justify-between" style={{ backgroundColor: color }}> 

            <h1 className='ml-2 text-3xl'>
                {class_info[0].campus} - {class_info[0].code} - {class_info[0].title} 

            </h1>
            

            {class_info[0].code in class_lock ? (
                <LockClosedIcon className='text-red-500 w-12 h-12 '></LockClosedIcon>
            ) : (
                <LockOpenIcon className='text-black-500 w-12 h-12  top-16 right-16' onClick={handleClick}></LockOpenIcon>
            )}

            </div>
            <h1 className="p-2 text-lg border-b text-black"> Registration Number: {class_info[class_info.length - 1].crn} </h1>

            
            <h1 className="p-2 text-lg border-b  text-black">Taught By: {class_info[0].Professor}</h1>


            {class_info.map((item, index) => (
                <h1 key={index} className="p-2 text-lg border-b  text-black">
                    {item.schd} - {item.time} - {item.instruction_method}
                </h1>
            ))}

        </div>

    )
  }
  
  export default class_card