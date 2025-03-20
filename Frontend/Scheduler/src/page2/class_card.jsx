import { common } from '@mui/material/colors';
import CryptoJS from 'crypto-js';

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


function class_card({class_info}) {
    const color = stringToLightHex(class_info[0].code.replace(/ /g, "_"))
    return (
        <div className="w-full border-2 border-black p-2 " style={{ backgroundColor: color }}>

            <h1 className="p-2 text-lg border-b font-bold"> {class_info[0].campus} - {class_info[0].code} - {class_info[0].title}</h1>
            <h1 className="p-2 text-lg border-b font-bold">Taught By: {class_info[0].Professor}</h1>


            {class_info.map((item, index) => (
                <h1 key={index} className="p-2 text-lg border-b font-bold">
                    {item.schd} - {item.time}
                </h1>
            ))}

        </div>


    )
  }
  
  export default class_card