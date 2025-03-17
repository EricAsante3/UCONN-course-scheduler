import Search_and_Cart_section from "./components/Search_and_Cart_section.jsx"
import Schedule_block from "./components/Schedule_block.jsx"



function App() {
  return (
    <div className="flex flex-col items-center justify-center p-[2rem]">

      <Search_and_Cart_section></Search_and_Cart_section>
      <Schedule_block></Schedule_block>

    </div>
  )
}

export default App
