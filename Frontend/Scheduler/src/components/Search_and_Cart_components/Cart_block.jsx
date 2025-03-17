import React, { useState, useContext } from "react";
import { Button, Modal, Box, Typography, CircularProgress } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { DataContext} from "../../data/data.jsx";

function Cart_block() {

    // JSON data
    const { cart_data, setcart_data} = useContext(DataContext);

    // class names
    const class_names = Object.keys(cart_data)

    const [open, setOpen] = useState(false);

    const deleteItem = (index) => {
        const keyToDelete = class_names[index]; // Get key based on index
    
        // Create a copy of data without the deleted key
        const updatedData = { ...cart_data };
        delete updatedData[keyToDelete]; // Remove the key
    
        setcart_data(updatedData); // Update state
    };


    const [selectedClass, setSelectedClass] = useState(null)
    // When info is clicked, store the selected class and open the modal.
    const handleOpenModal = (className) => {
        setSelectedClass(className);
        setOpen(true);
    };

    // helper function for setting up data for info button
    function getClassLectureInfo(className) {
        if (!cart_data.hasOwnProperty(className)) {
            return [];
        }
        const classData = cart_data[className];
        return Object.keys(classData).map((crn) => ({
            crn,
            enrollmentCapacity: classData[crn]["Enrollment Capacity"],
            professor: classData[crn]["Professor"],
            meets: classData[crn]["meets"]
        }));
    }

    // if (Object.keys(cart_data).length === 0) {
    //     return (
    //         <div className="fixed inset-0 flex items-center justify-center bg-white">
    //             <CircularProgress />
    //         </div>
    //     );
    // }


    return (
        <>
            <div className="h-[50rem] flex flex-col border-2 border-black justify-top items-center bg-white size-full mb-auto">
                <div className="flex p-1 w-full border border-b-black">
                    <h1 className="text-5xl mr-auto p-3 text-black">Class List</h1>
                </div> 
                <div className="h-[80%] size-full">
                <ul className="flex flex-col items-center w-full">
                    {class_names.map((item, index) => (
                        <li key={index} className="flex justify-between border border-b-black items-center w-full py-4 ">
                        <div className="flex items-center">
                            <Button onClick={() => handleOpenModal(item)}>
                                <InformationCircleIcon className="w-6 h-6 border" />
                            </Button>

                            <Modal open={open} onClose={() => setOpen(false)}>
                                <Box
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: "70%",
                                    height: "60%",
                                    bgcolor: "background.paper",
                                    boxShadow: 24,
                                    overflowY: "auto",
                                    p: 4,
                                    borderRadius: 2
                                }}
                                >
                                {selectedClass ? (
                                    <>
                                    <Typography variant="h4" color="black">
                                        {selectedClass} Info
                                    </Typography>
                                    {getClassLectureInfo(selectedClass).map((lecture) => (
                                        <Box key={lecture.crn} sx={{ mt: 2, mb: 2, borderBottom: "1px solid #ccc", pb: 1 }}>
                                        <Typography color="black">
                                            <strong>CRN:</strong> {lecture.crn}
                                        </Typography>
                                        <Typography color="black">
                                            <strong>Enrollment capacity:</strong> {lecture.enrollmentCapacity}
                                        </Typography>
                                        <Typography color="black">
                                            <strong>Professor:</strong> {lecture.professor}
                                        </Typography>
                                        <Typography color="black">
                                            <strong>Meets:</strong> {lecture.meets}
                                        </Typography>
                                        </Box>
                                    ))}
                                    </>
                                ) : (
                                    <Typography color="black">No class selected.</Typography>
                                )}
                                <Button sx={{ mt: 3 }} variant="contained" onClick={() => setOpen(false)}>
                                    Close
                                </Button>
                                </Box>
                            </Modal>
                            <div className="text-4xl px-1 text-black">
                                {item}
                            </div>
                        </div>
                        <button onClick={() => deleteItem(index)} className="border ml-auto mr-2 text-black">
                            <TrashIcon className="w-6 h-6 text-red-500" />
                        </button>
                        </li>     
                    ))}
                </ul>
                </div>
                <div className="mr-auto mt-auto p-3 text-blue-500"> 
                    <Button variant="contained" 
                        sx={{
                            backgroundColor: '#000E2F',
                            color: 'white',
                            padding: '8px 16px',
                            '&:hover': {
                            backgroundColor: '#00d2fc',
                            },
                        }}>
                        Generate
                    </Button>
                </div>
            </div>
        </>
    )
}
  
export default Cart_block
  