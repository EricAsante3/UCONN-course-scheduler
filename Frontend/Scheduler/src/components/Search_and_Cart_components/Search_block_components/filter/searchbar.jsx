import { useRef,useEffect,useState } from 'react';

function search({ filter, setfilter, options }) {

  const handleDropdownChange = (e) => {
    setfilter(e.target.value);
  };

  return (

      <div className="hover:border-blue-500 rounded z-0 border-2 border-grey text-center text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 inline-block relative">
        <select id="dropdown" value={filter} onChange={handleDropdownChange}>
          {options.map((option, index) => (<option key={index} value={option}>{option}</option>))}
        </select>
      </div>
  )
}

export default search
