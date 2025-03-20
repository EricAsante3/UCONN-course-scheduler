import Select from "react-select";
import { customStyles } from "./Styles/searchbar_style.jsx";


function search({ filter, setfilter, options }) {

  const handleDropdownChange = (e) => {
    setfilter(e.target.value);
  };

  return (

      <div className="inline-block relative">
        <select
          className="w-full py-2 px-3 border bg-[#ffffff] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500 text-gray-900"
          id="dropdown"
          value={filter}
          onChange={handleDropdownChange}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="py-2 px-3 bg-white text-gray-900 hover:bg-gray-100 focus:bg-blue-100"
            >
              {option}
            </option>
          ))}
        </select>
      </div>
  )
}

export default search
