import Search_and_Cart_section from "./page1/components/Search_and_Cart_section.jsx"
import Schedule_block from "./page1/components/Schedule_block.jsx"
import Display from "./page2/display.jsx";
import Welcome from "./page1/components/Welcome.jsx";
import { Modal, Box} from "@mui/material";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";


function App() {
  const [open, setOpen] = useState(true);

  return (
    
    <Router>
      <Routes>
        <Route path="/" element={
            
            <div className=" relative flex flex-col items-center   justify-center p-[0]">

            <Modal open={open} >
                <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "red",
                        display: "flex", // Enables flexbox for centering
                        alignItems: "center", // Centers vertically
                        justifyContent: "center", // Centers horizontally
                        padding: 3, // Adds spacing inside
                        borderRadius: 2, // Optional: rounded corners
                        maxWidth: "80%", // Limits width
                        minWidth: "300px", // Prevents it from being too small
                      }}
                          >


                              <Welcome state={setOpen}> </Welcome>

                          </Box>
                      </Modal>
              
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
