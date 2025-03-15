import { useContext } from "react";

import Cart_block from "./components/Cart_block.jsx"
import Search_block from "./components/Search_block.jsx"
import { DataContext } from "./data/data.jsx";

function App() {
  const { cart_data, setcart_data } = useContext(DataContext);
  const { searched_data, setsearched_data } = useContext(DataContext);

  console.log(searched_data)
  return (
    <div>
      <Search_block></Search_block>
      {cart_data}
      <Cart_block></Cart_block>
    </div>
  )
}

export default App
