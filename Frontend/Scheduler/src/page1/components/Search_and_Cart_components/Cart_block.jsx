import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Box, Typography, CircularProgress } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { DataContext } from "../../../data/data.jsx";

function traverseDict(d, e, flag) {
  let keysToDelete = []; // Stores top-level keys to delete


  if (flag === "availabilities_data"){
      for (let key2 of Object.keys(d)) {
        let keysToDeleteInner = []; // Stores inner keys to delete
        for (let i of Object.keys(d[key2])) {
            let flag2 = 1; // Assume it should be deleted
            for (let key1 in e) {
                let campus = Object.values(e[key1])[0]["campus"];
                if (key2 === key1.split(" ", 1)[0] && campus === i) {
                    flag2 = 0; // If condition matches, don't delete
                    break;
                }
            }
            if (flag2 === 1) {
                keysToDeleteInner.push(i); // Mark for deletion
            }
        }

        // Delete inner keys after iteration
        for (let key of keysToDeleteInner) {
            delete d[key2][key];
        }

        // If value2 is empty after removals, mark key2 for deletion
        if (Object.keys(d[key2]).length === 0) {
            keysToDelete.push(key2);
        }
    }
      // Delete top-level keys after iteration
      for (let key of keysToDelete) {
        delete d[key];
      }
  } else if (flag === "individual_classes" ) {
      for (let key in d) {
          if (!e.hasOwnProperty(key)) {
              delete d[key];
          }
      }
  }
  


}




function Cart_block() {
  const { cart_data, setcart_data, availabilities_data, setavailabilities_data, individual_classes, setindividual_classes, classes_combinations, setclasses_combinations, valid_class_combinations,setvalid_class_combinations, api_url} = useContext(DataContext);
  const class_names = Object.keys(cart_data);

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [lectureInfo, setLectureInfo] = useState([]);
  // New state for pending deletion: stores the class name that the user wants to delete.
  const [pendingDeletion, setPendingDeletion] = useState(null);

  async function handle_schedule_create() {


    if (Object.keys(individual_classes).length !== 0) {

        const schedules_post = async (data1) => {    
            const response = await fetch(api_url + '/course_scheduler/make_schedule_no_conflict', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data1), // Form data automatically sets the appropriate Content-Type
            });
            if (response.ok) {
                const responseData = await response.json(); // Parse the JSON response
                return responseData;
            } else {
                throw new Error('Failed to create schedule');
            }
        };

        // Define valid_schedules_post as an async function
        const valid_schedules_post = async (response_schedules, ava_data) => {    
            const response = await fetch(api_url + '/course_scheduler/valid_schedules', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    schedules: response_schedules, 
                    ava: ava_data
                }), // Form data automatically sets the appropriate Content-Type
            });
            if (response.ok) {
                const responseData = await response.json(); // Parse the JSON response
                return responseData;
            } else {
                throw new Error('Failed to validate schedules');
            }
        };

        try {
            // Call the schedules_post function and await its result

            const response_schedules = await schedules_post(individual_classes);
            // Call the valid_schedules_post function with the response from schedules_post
            const response_valid_schedules = await valid_schedules_post(response_schedules, availabilities_data);

            // Set state with the resolved results
            setclasses_combinations(response_schedules);
            setvalid_class_combinations(response_valid_schedules);
        } catch (error) {
            console.error('Error:', error);
        }
  }
}


  const deleteItem = (index) => {
    const keyToDelete = class_names[index];
    const Curr_cart_data = { ...cart_data };
    const Curr_availabilities_data = { ...availabilities_data};
    const Curr_individual_classes = { ...individual_classes};

    delete Curr_cart_data[keyToDelete];
    traverseDict(Curr_availabilities_data,Curr_cart_data,"availabilities_data")
    traverseDict(Curr_individual_classes,Curr_cart_data,"individual_classes")

    setcart_data(Curr_cart_data);
    if (JSON.stringify(Curr_availabilities_data) !== JSON.stringify(availabilities_data)){
      setavailabilities_data(Curr_availabilities_data)
    }
    if (JSON.stringify(Curr_individual_classes) !== JSON.stringify(individual_classes)){
      setindividual_classes(Curr_individual_classes)
    }
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
      <div className="h-[50rem] flex flex-col justify-top items-center bg-white   divide-black border-4 border-black size-full ">
        <div className="flex  w-full border border-b-black">
          <h1 className="text-5xl mr-auto p-3 text-black">Class List</h1>
        </div>
        <div className="h-[80%] size-full overflow-auto">
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
        <div className="flex items-center justify-center p-3 bg-amber-200 w-full h-[10%] text-blue-500">
          <button className=" bg-fuchsia-300 w-full h-full "  onClick={handle_schedule_create}>
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart_block;
