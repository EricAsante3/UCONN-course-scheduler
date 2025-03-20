import Search from "./searchbar"
import SearchableDropdown from "./subject_searchbar"
import { useState,useEffect,useContext } from 'react';
import { DataContext } from "../../../../../data/data.jsx";






const ContentArea = [
    "Any",
    "CA1: Arts & Humanities",
    "CA2: Social Science",
    "CA3: Science & Technology",
    "CA3LAB: Science & Tech Lab",
    "CA4: Diversity & Multicultural",
    "CA4INT: Div & Multi Intl"
]

const CreditHours = [
    "Any",
    "1 Credits",
    "2 Credits",
    "3 Credits",
    "4 Credits"
]


const Competency = [
    "Any",
    "COMP: Environmental Literacy",
    "COMP: Quantitative Competency",
    "COMP: Writing Competency"
] 

const inquiry = [
    "Any",
    "TOI1: Creativity: Des,Expr,Inn",
    "TOI2: Cultural Dimen Human Exp",
    "TOI3: Div, Equity, Soc Just",
    "TOI4: Environmental Literacy",
    "TOI5: Indiv Values Soc Inst",
    "TOI6: Science & Empirical Inq",
    "TOI6L: Science Emp Inq (Lab)"
]

const seats = [
        "Any",
        "Open Classes",
        "Closed (Waitlist Open)",
]

const teaching_method = [
    "Any",
    "In-person classes",
    "Hybrid classes",
    "Online classes"
]

function Search_block_form() {
    const { campus, semester, api_url, setsearched_data} = useContext(DataContext);
    const [subject_filter, set_subject_filter] = useState('Any');
    const [ContentArea_filter, set_ContentArea_filter] = useState('Any');
    const [CreditHours_filter, set_CreditHours_filter] = useState('Any');
    const [inquiry_filter, set_inquiry_filter] = useState('Any');
    const [competency_filter, set_competency_filter] = useState('Any');
    const [seats_filter, set_seats_filter] = useState('Any');
    const [teaching_method_filter, set_teaching_method_filter] = useState('Any');
    const [formData, setFormData] = useState({});
    const [defult, setdefult] = useState(false); // Additional state to force re-render

    useEffect(() => {
        const postFormData = async () => {    
            try {
                const response = await fetch((api_url + '/course_scheduler/get_classes'), {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData), // Form data automatically sets the appropriate Content-Type
                });
        
                if (response.ok) {
                    const responseData = await response.json(); // Parse the JSON response
                    if (Object.keys(responseData).length === 0) {
                        setsearched_data({ "none": 0 }); // Set empty result
                    } else {
                        setsearched_data(responseData); // Set the actual response
                    }

                } else {
                    setsearched_data("error")
                }
            } catch (error) {
                setsearched_data("error")
            }
        };
        
        if (Object.keys(formData).length !== 0) {
            postFormData()
        }



    }, [formData]);


    function reset_filter() {

        set_subject_filter('Any'); // Reset subject filter if needed
        set_ContentArea_filter('Any');
        set_CreditHours_filter('Any');
        set_inquiry_filter('Any');
        set_competency_filter('Any');
        set_seats_filter('Any');
        set_teaching_method_filter('Any');
        setsearched_data({});

    }
    // Handle form submission
    const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare JSON data
    const jsonData = {
        "subject": subject_filter,
        "season_year": semester,
        "campus": campus,
        "C_area": ContentArea_filter,
        "hours": CreditHours_filter,
        "seats": seats_filter,
        "competency": competency_filter,
        "inquiry": inquiry_filter,
        "teaching_method": teaching_method_filter


    };




    if (
        subject_filter === "Any" &&
        ContentArea_filter === "Any" &&
        CreditHours_filter === "Any" &&
        seats_filter === "Any" &&
        competency_filter === "Any" &&
        inquiry_filter === "Any" &&
        teaching_method_filter === "Any"
    ) {
        setsearched_data({"defult":0})
    } else {

        if (JSON.stringify(formData) !== JSON.stringify(jsonData)) {
            setFormData(jsonData);
        }
    }


    
    };


    return (

        <form onSubmit={handleSubmit} className="w-full h-full flex flex-col">

            <div className="flex flex-col p-2">
                <label className="text-black">Select Subject:</label>
                <SearchableDropdown filter={subject_filter} setfilter={set_subject_filter}></SearchableDropdown>
            </div>


            <div className="flex flex-col p-2 ">
                <label className="text-black">Select Content Area:</label> 
                <Search filter={ContentArea_filter} setfilter={set_ContentArea_filter} options={ContentArea}></Search>
            </div>

            <div className="flex flex-col p-2 ">
                <label className="text-black">Select Competency:</label> 
                <Search filter={competency_filter} setfilter={set_competency_filter} options={Competency}></Search>
            </div>

            <div className="flex flex-col p-2 ">
                <label className="text-black w-full">Select Inquiry:</label> 
                <Search filter={inquiry_filter} setfilter={set_inquiry_filter} options={inquiry}></Search>
            </div>

            <div className="flex flex-col p-2 ">
                <label className="text-black">Select Credit Hours:</label> 
                <Search filter={CreditHours_filter} setfilter={set_CreditHours_filter} options={CreditHours}></Search>
            </div>

            <div className="flex flex-col p-2 ">
                <label className="text-black">Select Seat Availability:</label> 
                <Search filter={seats_filter} setfilter={set_seats_filter} options={seats}></Search>
            </div>

            <div className="flex flex-col p-2 ">
                <label className="text-black">Select Teaching Method:</label> 
                <Search filter={teaching_method_filter} setfilter={set_teaching_method_filter} options={teaching_method}></Search>
            </div>


            <div className="flex flex-col p-2">
                <button   className=" mb-4 w-full py-2 px-3 border bg-[#ffffff] border-gray-300 rounded-md focus:outline-none  hover:border-blue-500 text-gray-900" type="submit">
                    Submit
                </button>

                <button   className="w-full py-2 px-3 border bg-[#ffffff] border-gray-300 rounded-md focus:outline-none hover:border-blue-500 text-gray-900" onClick={reset_filter} type="button">
                    Reset Filters
                </button>
            </div>


        </form>    


        
    )
  }
  
  export default Search_block_form
  