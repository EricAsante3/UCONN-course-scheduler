import React, { useState, useContext, useEffect } from "react";
import { Button, Modal, Box, Typography, CircularProgress } from "@mui/material";
import { TrashIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { DataContext } from "../../../data/data.jsx";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


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


const LectureLabTable = ({ lectureInfo }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="class schedule table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Option</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Session</strong></TableCell>
            <TableCell><strong>Class</strong></TableCell>
            <TableCell><strong>Meeting Dates</strong></TableCell>
            <TableCell><strong>Days and Times</strong></TableCell>
            <TableCell><strong>Campus</strong></TableCell>
            <TableCell><strong>Instructor</strong></TableCell>
            <TableCell><strong>Instruction Mode</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lectureInfo.map((lecture, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell rowSpan={lecture.lab_crn ? 2 : 1}>{lecture.option}</TableCell>
                <TableCell>Open</TableCell>
                <TableCell>Regular Academic</TableCell>
                <TableCell>
                  Component {lecture.lecture_schd}-Section - Class# {lecture.lecture_crn}
                </TableCell>
                <TableCell>{lecture.lecture_start_date} - {lecture.lecture_end_date}</TableCell>
                <TableCell>{lecture.lecture_meets}</TableCell>
                <TableCell>{lecture.lecture_campus}</TableCell>
                <TableCell>{lecture.lecture_professor}</TableCell>
                <TableCell>{lecture.lecture_instruction_method}</TableCell>
              </TableRow>

              {lecture.lab_crn && (
                <TableRow>
                  <TableCell>Open</TableCell>
                  <TableCell>Regular Academic</TableCell>
                  <TableCell>
                    Component {lecture.lab_schd}-Section - Class# {lecture.lab_crn}
                  </TableCell>
                  <TableCell>{lecture.lab_start_date} - {lecture.lab_end_date}</TableCell>
                  <TableCell>{lecture.lab_meets}</TableCell>
                  <TableCell>{lecture.lab_campus}</TableCell>
                  <TableCell>{lecture.lab_professor}</TableCell>
                  <TableCell>{lecture.lab_instruction_method}</TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};




function Cart_block() {
  const { cart_data, setcart_data, availabilities_data, setavailabilities_data, individual_classes, setindividual_classes, classes_combinations, setclasses_combinations, valid_class_combinations,setvalid_class_combinations, api_url} = useContext(DataContext);
  const class_names = Object.keys(cart_data);

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);


  const [loadingschedules, setloadingschedules] = useState(false);
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

  // console.log(Object.keys(individual_classes).length)


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



  function getClassLectureInfo(className, cart_data, individual_classes) {
    let groupedLectures = [];

    if (individual_classes && individual_classes[className]) {
        const classData = individual_classes[className];

        Object.keys(classData).forEach((professor) => {
            Object.keys(classData[professor]).forEach((section) => {
                const lectures = classData[professor][section];

                // If there's only one lecture and no lab, add it separately
                if (lectures.length === 1) {
                    const lecture = lectures[0];

                    groupedLectures.push({
                        option: groupedLectures.length + 1,
                        lecture_crn: lecture.crn,
                        lecture_professor: lecture.Professor,
                        lecture_campus: lecture.campus,
                        lecture_start_date: lecture.start_date,
                        lecture_end_date: lecture.end_date,
                        lecture_instruction_method: lecture.instruction_method,
                        lecture_meets: lecture.meets,
                        lecture_schd: lecture.schd,

                        lab_crn: null, // No lab
                        lab_professor: null,
                        lab_campus: null,
                        lab_start_date: null,
                        lab_end_date: null,
                        lab_instruction_method: null,
                        lab_meets: null,
                        lab_schd: null,
                    });
                } else {
                    // Handle Lecture-Lab pairs if both exist
                    const lecture = lectures.find(l => l.schd !== "LAB");
                    const lab = lectures.find(l => l.schd === "LAB" || l.schd === "DIS");

                    if (lecture) {
                        groupedLectures.push({
                            option: groupedLectures.length + 1,
                            lecture_crn: lecture.crn,
                            lecture_professor: lecture.Professor,
                            lecture_campus: lecture.campus,
                            lecture_start_date: lecture.start_date,
                            lecture_end_date: lecture.end_date,
                            lecture_instruction_method: lecture.instruction_method,
                            lecture_meets: lecture.meets,
                            lecture_schd: lecture.schd,

                            lab_crn: lab ? lab.crn : null,
                            lab_professor: lab ? lab.Professor : null,
                            lab_campus: lab ? lab.campus : null,
                            lab_start_date: lab ? lab.start_date : null,
                            lab_end_date: lab ? lab.end_date : null,
                            lab_instruction_method: lab ? lab.instruction_method : null,
                            lab_meets: lab ? lab.meets : null,
                            lab_schd: lab ? lab.schd : null,
                        });
                    }
                }
            });
        });
    }

    return groupedLectures;
  }



  


  const handleOpenModal = (className) => {
    setSelectedClass(className);
    setLectureInfo([]);    // Clear previous data
    setLoadingInfo(true);  // Start buffering
    setOpen(true);
  };

  useEffect(() => {

    if (open && selectedClass) {
        setLectureInfo([]);    // Clear previous data
        setLoadingInfo(true);  // Start buffering

        const fetchLectureInfo = async () => {
            await new Promise((resolve) => setTimeout(resolve, 300)); // Optional delay for UI feedback
            const info = getClassLectureInfo(selectedClass, cart_data, individual_classes);

            setLectureInfo(info);
            setLoadingInfo(false);
        };

        fetchLectureInfo();
    }
  }, [open, selectedClass, cart_data, individual_classes]);
      
      





  useEffect(() => {
    if (Object.values(individual_classes).includes("")) {
      setloadingschedules(false)
    } else (
      setloadingschedules(true)
    )
  }, [individual_classes]);




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
      <div className="drop-shadow-[10px_15px_10px_rgba(0,0,0,0.5)] h-[50rem] relative flex flex-col justify-top items-center bg-gray-100   divide-black border-2 border-black size-full ">

        <div className="flex  w-full  text-center ">
          <h1 className="text-5xl text-center mr-auto p-3 w-full font-semibold  text-black">Class List</h1>
        </div>
        <div className="h-[80%] size-full overflow-auto">
          <ul className="flex flex-col p-2 space-y-2 items-center w-full">
            {class_names.map((item, index) => {
              // For trash icon behavior: if pendingDeletion matches this item,
              // show spinner. Otherwise, show trash icon.
              return (
                <li key={index} className="flex rounded-md bg-white justify-between border border-gray-300 items-center w-full py-4">
                  <div className="flex items-center">
                    <Button onClick={() => handleOpenModal(item)}>
                      <InformationCircleIcon className="w-6 h-6 " />
                    </Button>

                    <Modal open={open} onClose={() => setOpen(false)}>
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "80%",
                          height: "75%",
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
                                <Typography variant="h3" color="black" sx={{ mb: 3 }}>
                                  {selectedClass} Info
                                </Typography>
                                <LectureLabTable lectureInfo={lectureInfo} />
                              </>
                            ) : (
                              <Typography color="black">No class selected.</Typography>
                            )}
                            <div>
                            <Button sx={{marginTop: 4 }} variant="contained" onClick={() => setOpen(false)}>
                              Close
                            </Button>
                            </div>
                          </>
                        )}
                      </Box>
                    </Modal>
                    <div className="text-2xl px-1 font-medium text-black">{item}</div>
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
                    className=" ml-auto mr-2 text-black"
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
        <div className="flex items-center border-black p-2 text-black justify-center w-full h-[10%] ">

        {loadingschedules === false ? (
              <CircularProgress size={24} />
        ) : (
              <button
                className="bg-[#4d7ff1] cursor-pointer text-center border-2 border-black rounded-xl w-full text-4xl font-semibold h-full text-white"
                onClick={handle_schedule_create}>
                Generate
              </button>
            )}

        </div>
      </div>
    </>
  );
}

export default Cart_block;

