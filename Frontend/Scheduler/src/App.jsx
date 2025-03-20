import Search_and_Cart_section from "./page1/components/Search_and_Cart_section.jsx"
import Schedule_block from "./page1/components/Schedule_block.jsx"
import Display from "./page2/display.jsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (





    <Router>
      <Routes>
        <Route path="/" element={
              <div className="flex flex-col items-center justify-center p-[2rem]">

              <Search_and_Cart_section></Search_and_Cart_section>
              <Schedule_block></Schedule_block>

            </div>
        } />
        <Route path="/display" element={<Display />} />
      </Routes>
    </Router>









  )
}

export default App
