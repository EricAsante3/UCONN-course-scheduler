import Cart_block from "./Search_and_Cart_components/Cart_block.jsx"
import Search_block from "./Search_and_Cart_components/Search_block.jsx"


function Search_and_Cart_section() {

    return (
      <div className=" p-[2rem] w-full bg-red-500 flex flex-row space-x-4 items-center justify-center"> 
      
        <Cart_block></Cart_block>
        <Search_block></Search_block>

      </div>
    )
  }
  
  export default Search_and_Cart_section