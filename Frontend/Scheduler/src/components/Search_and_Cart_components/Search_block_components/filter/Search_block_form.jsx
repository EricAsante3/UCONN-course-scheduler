import Search from "./searchbar"
import { useState,useEffect,useContext } from 'react';
import { DataContext } from "../../../../data/data.jsx";



const subjects = {
    "Any subject": "",
    "Asian and Asian American Studies": "AAAS",
    "Accounting": "ACCT",
    "American English Language Institute": "AELI",
    "Africana Studies": "AFRA",
    "Agriculture and Natural Resources": "AGNR",
    "Allied Health Sciences": "AH",
    "Agriculture, Health and Natural Resources": "AHNR",
    "Air Force Studies": "AIRF",
    "Applied Linguistics and Discourse Studies": "ALDS",
    "Advanced Manufacturing for Energy Systems": "AMES",
    "American Studies": "AMST",
    "Anesthesiology": "ANES",
    "Animal Science": "ANSC",
    "Anthropology": "ANTH",
    "Arabic": "ARAB",
    "Agricultural and Resource Economics": "ARE",
    "Arabic and Islamic Studies": "ARIS",
    "Art": "ART",
    "Art History": "ARTH",
    "American Sign Language": "ASLN",
    "Business Administration": "BADM",
    "Basics (Social Work)": "BASC",
    "Biological Sciences": "BIOL",
    "Biostatistics": "BIST",
    "Business Law": "BLAW",
    "Biomedical Engineering": "BME",
    "Dental Basic Medical Sciences": "BSCI",
    "Business": "BUSN",
    "Classics and Ancient Mediterranean Studies": "CAMS",
    "Clinical Dental Science": "CDSC",
    "Civil Engineering": "CE",
    "COOP Education Work Placement": "CEWP",
    "Chemical Engineering": "CHEG",
    "Chemistry": "CHEM",
    "Chinese": "CHIN",
    "Comparative Literary and Cultural Studies": "CLCS",
    "Clinical": "CLIN",
    "Clinical and Translational Research": "CLTR",
    "Cognitive Science": "COGS",
    "Communication": "COMM",
    "Community Organization (Social Work)": "CORG",
    "Computer Science and Engineering": "CSE",
    "Dental Science": "DENT",
    "Dental Residency and Fellowship Program": "DERE",
    "Dermatology": "DERM",
    "Diagnostic Genetic Sciences": "DGS",
    "Dietetics": "DIET",
    "Digital Media and Design": "DMD",
    "Dramatic Arts": "DRAM",
    "Statistical Data Science and Analysis": "DSDA",
    "Direct Service Elective (Social Work)": "DSEL",
    "Electrical and Computer Engineering": "ECE",
    "Economics": "ECON",
    "Education Curriculum and Instruction": "EDCI",
    "Educational Leadership": "EDLR",
    "Ecology and Evolutionary Biology": "EEB",
    "Education": "EGEN",
    "Executive MBA": "EMBA",
    "Emergency Medicine": "EMED",
    "English": "ENGL",
    "Engineering": "ENGR",
    "Environmental Engineering": "ENVE",
    "Environmental Sciences": "ENVS",
    "Educational Psychology": "EPSY",
    "Earth Sciences": "ERTH",
    "European Studies": "ES",
    "Environmental Studies": "EVST",
    "Exploratory": "EXPL",
    "Foundational Dental Science": "FDSC",
    "Field Education (Social Work)": "FED",
    "Family Medicine": "FMED",
    "Finance": "FNCE",
    "French": "FREN",
    "Geography": "GEOG",
    "German": "GERM",
    "General and Professional Studies": "GPS",
    "Graduate School": "GRAD",
    "Human Behavior Elective": "HBEL",
    "Hartford Consortium For Higher Education": "HCHE",
    "Healthcare Management and Insurance Studies": "HCMI",
    "Human Development and Family Sciences": "HDFS",
    "Hebrew and Judaic Studies": "HEJS",
    "History": "HIST",
    "Human Rights": "HRTS",
    "Individuals, Groups, and Families (Social Work)": "IGFP",
    "Italian Literature and Cultural Studies": "ILCS",
    "Internal Medicine": "IMED",
    "Institute of Materials Science": "IMS",
    "India Studies": "INDS",
    "Interdepartmental": "INTD",
    "International Studies": "INTS",
    "Irish": "IRIS",
    "Independent Study (Social Work)": "IS",
    "Institute for Systems Genomics": "ISG",
    "Japanese": "JAPN",
    "Journalism": "JOUR",
    "Kinesiology": "KINS",
    "Korean": "KORE",
    "Landscape Architecture": "LAND",
    "Law": "LAW",
    "Literatures, Cultures, and Languages": "LCL",
    "Linguistics": "LING",
    "Latino and Latin American Studies": "LLAS",
    "School of Medicine": "M",
    "Marine Sciences": "MARN",
    "Maritime Studies": "MAST",
    "Mathematics": "MATH",
    "Molecular and Cell Biology": "MCB",
    "Mechanical Engineering": "ME",
    "Medical Science": "MEDS",
    "Management and Engineering for Manufacturing": "MEM",
    "Management and Entrepreneurship": "MENT",
    "Manufacturing Engineering": "MFGE",
    "Modern Greek": "MGRK",
    "Military Science": "MISI",
    "Marketing": "MKTG",
    "Medical Laboratory Sciences": "MLSC",
    "Materials Science and Engineering": "MSE",
    "Music": "MUSI",
    "Neurology": "NEUR",
    "Natural Resources and the Environment": "NRE",
    "Nursing": "NURS",
    "Nutritional Sciences": "NUSC",
    "OBGYN": "OBGY",
    "Off Campus": "OFFC",
    "OMFS": "OMFS",
    "Operations and Information Management": "OPIM",
    "Orthopaedic": "ORTH",
    "Occupational Safety and Health": "OSH",
    "Pathobiology": "PATH",
    "Pediatrics": "PEDS",
    "Pharmacy - PHAR": "PHAR",
    "Philosophy": "PHIL",
    "Pharmacy - PHRX": "PHRX",
    "Physics": "PHYS",
    "Plant Science": "PLSC",
    "Physiology and Neurobiology": "PNB",
    "Political Science": "POLS",
    "Polymer Science and Engineering": "POLY",
    "Policy Practice (Social Work)": "POPR",
    "Portuguese": "PORT",
    "Public Policy": "PP",
    "Psychiatry": "PSCH",
    "Psychological Sciences": "PSYC",
    "Physical Therapy": "PT",
    "Pathology": "PTHO",
    "Public Health": "PUBH",
    "Radiology": "RADS",
    "Research (Social Work)": "RSCH",
    "Agriculture (RH)": "SAAG",
    "Animal Science (RH)": "SAAS",
    "Natural Resources and the Environment (RH)": "SANR",
    "Pathobiology (RH)": "SAPB",
    "Plant Science (RH)": "SAPL",
    "Agricultural and Resource Economics (RH)": "SARE",
    "Systems Engineering": "SE",
    "Speech, Language and Hearing Science": "SLHS",
    "Sociology": "SOCI",
    "Social Work": "SOWK",
    "Spanish": "SPAN",
    "Sustainable Plant and Soil Systems": "SPSS",
    "Special Topics (Social Work)": "SPTP",
    "Social Work": "SSW",
    "Statistics": "STAT",
    "Surgery": "SURG",
    "Social Work Elective": "SWEL",
    "Transformation": "TRNS",
    "Translation Studies": "TRST",
    "University": "UNIV",
    "Urban and Community Studies": "URBN",
    "Women's, Gender, and Sexuality Studies": "WGSS"
}

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
    const [subject_filter, set_subject_filter] = useState('');
    const [ContentArea_filter, set_ContentArea_filter] = useState('Any');
    const [CreditHours_filter, set_CreditHours_filter] = useState('Any');
    const [inquiry_filter, set_inquiry_filter] = useState('Any');
    const [competency_filter, set_competency_filter] = useState('Any');
    const [seats_filter, set_seats_filter] = useState('Any');
    const [teaching_method_filter, set_teaching_method_filter] = useState('Any');
    const [formData, setFormData] = useState({});


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
                    setsearched_data(responseData)
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


    // Handle form submission
    const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare JSON data
    const jsonData = {

        "season_year": semester,
        "campus": campus,
        "C_area": ContentArea_filter,
        "hours": CreditHours_filter,
        "seats": seats_filter,
        "competency": competency_filter,
        "inquiry": inquiry_filter,
        "teaching_method": teaching_method_filter


    };

    if (JSON.stringify(formData) !== JSON.stringify(jsonData)) {
        setFormData(jsonData);
    }
    
    };


    return (
        <form onSubmit={handleSubmit} className="bg-amber-900 w-full h-full flex flex-col">
            <Search filter={ContentArea_filter} setfilter={set_ContentArea_filter} options={ContentArea}></Search>
            <Search filter={CreditHours_filter} setfilter={set_CreditHours_filter} options={CreditHours}></Search>
            <Search filter={inquiry_filter} setfilter={set_inquiry_filter} options={inquiry}></Search>
            <Search filter={competency_filter} setfilter={set_competency_filter} options={Competency}></Search>
            <Search filter={seats_filter} setfilter={set_seats_filter} options={seats}></Search>
            <Search filter={teaching_method_filter} setfilter={set_teaching_method_filter} options={teaching_method}></Search>

            <button type="submit">Submit</button>

        </form>    
    )
  }
  
  export default Search_block_form
  