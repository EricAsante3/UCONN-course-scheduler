import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Box, Typography, CircularProgress } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { DataContext } from "../../data/data.jsx";

function Cart_block() {
  const { cart_data, setcart_data } = useContext(DataContext);
  const class_names = Object.keys(cart_data);

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [lectureInfo, setLectureInfo] = useState([]);
  // New state for pending deletion: stores the class name that the user wants to delete.
  const [pendingDeletion, setPendingDeletion] = useState(null);

  const deleteItem = (index) => {
    const keyToDelete = class_names[index];
    const updatedData = { ...cart_data };
    delete updatedData[keyToDelete];
    setcart_data(updatedData);
  };

  function getClassLectureInfo(className) {
    if (!cart_data[className]) return [];
    const classData = cart_data[className];
    return Object.keys(classData).map((crn) => ({
      crn,
      enrollmentCapacity: classData[crn]["Enrollment Capacity"],
      professor: classData[crn]["Professor"],
      meets: classData[crn]["meets"],
    }));
  }

  const handleOpenModal = (className) => {
    setSelectedClass(className);
    setLectureInfo([]);    // Clear previous data
    setLoadingInfo(true);  // Start buffering
    setOpen(true);
  };

  useEffect(() => {
    if (open && selectedClass) {
      // Check if detailed data for the selected class exists.
      if (cart_data[selectedClass] && Object.keys(cart_data[selectedClass]).length > 0) {
        const info = getClassLectureInfo(selectedClass);
        setLectureInfo(info);
        setLoadingInfo(false);
      } else {
        setLoadingInfo(true);
      }
    }
  }, [open, selectedClass, cart_data]);

  // New effect: if the user clicked the trash icon (pendingDeletion is set)
  // and now the underlying info for that class is available, then delete the item.
  useEffect(() => {
    if (pendingDeletion) {
      if (cart_data[pendingDeletion] && Object.keys(cart_data[pendingDeletion]).length > 0) {
        // Find the index of the class in the list.
        const index = class_names.indexOf(pendingDeletion);
        if (index !== -1) {
          deleteItem(index);
        }
        setPendingDeletion(null);
      }
    }
  }, [cart_data, pendingDeletion, class_names]);

  return (
    <>
      <div className="h-[50rem] flex flex-col justify-top items-center bg-white border-2 border-black size-full mb-auto">
        <div className="flex p-1 w-full border border-b-black">
          <h1 className="text-5xl mr-auto p-3 text-black">Class List</h1>
        </div>
        <div className="h-[80%] size-full">
          <ul className="flex flex-col items-center w-full">
            {class_names.map((item, index) => {
              // For trash icon behavior: if pendingDeletion matches this item,
              // show spinner. Otherwise, show trash icon.
              return (
                <li key={index} className="flex justify-between border border-b-black items-center w-full py-4">
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
                          borderRadius: 2,
                        }}
                      >
                        {loadingInfo ? (
                          <div className="flex justify-center items-center h-full">
                            <CircularProgress />
                          </div>
                        ) : (
                          <>
                            {selectedClass ? (
                              <>
                                <Typography variant="h3" color="black" sx={{mb: 3}}>
                                  {selectedClass} Info
                                </Typography>
                                {lectureInfo.map((lecture) => (
                                  <Box key={lecture.crn} sx={{ py: 2, px: 2, border: "1px solid #ccc", pb: 1, display: "flex", gap: 5, padding: 4, marginBottom: 2}}>
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
                            <Button className="mb-auto" variant="contained" onClick={() => setOpen(false)}>
                              Close
                            </Button>
                          </>
                        )}
                      </Box>
                    </Modal>
                    <div className="text-4xl px-1 text-black">{item}</div>
                  </div>
                  <button
                    onClick={() => {
                      // If underlying info for this class is loaded, delete immediately.
                      // Otherwise, mark this item for pending deletion.
                      if (cart_data[item] && Object.keys(cart_data[item]).length > 0) {
                        deleteItem(index);
                      } else {
                        setPendingDeletion(item);
                      }
                    }}
                    className="border ml-auto mr-2 text-black"
                  >
                    {pendingDeletion === item ? (
                      <CircularProgress size={24} />
                    ) : (
                      <TrashIcon className="w-6 h-6 text-red-500" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mr-auto mt-auto p-3 text-blue-500">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000E2F",
              color: "white",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "#00d2fc",
              },
            }}
          >
            Generate
          </Button>
        </div>
      </div>
    </>
  );
}

export default Cart_block;
