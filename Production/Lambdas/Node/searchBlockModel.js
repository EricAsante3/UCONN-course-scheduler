import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import { JSDOM } from "jsdom";
import { classAlias } from './classAlias.js';

const jar = new CookieJar();
const session = wrapper(axios.create({ jar }));



function getTermCode(termString) {
    const [season, yearStr] = termString.split(" ");
    const year = parseInt(yearStr, 10);
    const lastDigit = year % 10;
  
    const seasonMap = {
      spring: 3,
      summer: 5,
      fall: 8,
      winter: 1
    };
  
    const termDigit = seasonMap[season.toLowerCase()];
    if (!termDigit) return null; // invalid season
  
    return `12${lastDigit}${termDigit}`;
}


export class SearchBlock {

    url = "https://student.studentadmin.uconn.edu/psc/CSGUE/EMPLOYEE/SA/c/UC_ENROLL.UC_GUEST_CLS_SCH.GBL"
    header = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 'Referer': this.url }

    async search(Class,Campus,Term){
        const rawHtml = await this.htmlScraper(Class,Campus,getTermCode(Term))
        if (rawHtml["status"] > 200) {return rawHtml}
        const parsedHtml = this.htmlParser(rawHtml["value"])
        return parsedHtml
    }

    async htmlScraper(Class,Campus,Term){

        const formdata = { "ICAJAX": "1", "ICNAVTYPEDROPDOWN": "0", "ICType": "Panel", "ICElementNum": "0", "ICAction": "#ICPanel1", }

        const firstRequest = await session.get(this.url, { headers: this.header });

        const firstRequestOutput = this.firstRequestTestCases(firstRequest.data)
        
        if (firstRequestOutput > 0) {
            return {"status": 500, "value": "Internal Error"}
        }

        let formBody = new URLSearchParams(formdata).toString();
        const secondRequest = await session.post(this.url, formBody, { headers: this.header });

        const secondRequestOutput = this.secondRequestTestCases(secondRequest.data)

        if (secondRequestOutput > 0) {
            return {"status": 500, "value": "Internal Error"}
        }

        if (Campus === "Storrs") {
            formdata["CAMPUS_TBL$selmh$0$$0"] = "Y"
            formdata["CAMPUS_TBL$selm$0$$0"] = "on"
        } else if (Campus === "Stamford") {
            formdata["UC_CAMPUS_VW$selmh$0$$0"] = "Y"
            formdata["UC_CAMPUS_VW$selm$0$$0"] = "on"
        } else if (Campus === "Waterbury") {
            formdata["UC_CAMPUS_VW$selmh$1$$0"] = "Y"
            formdata["UC_CAMPUS_VW$selm$1$$0"] = "on"
        } else if (Campus === "Avery Point") {
            formdata["CAMPUS_TBL$selmh$1$$0"] = "Y"
            formdata["CAMPUS_TBL$selm$1$$0"] = "on"
        } else if (Campus === "Hartford") {
            formdata["CAMPUS_TBL$selmh$2$$0"] = "Y"
            formdata["CAMPUS_TBL$selm$2$$0"] = "on"
        } else {
            return {"status": 500, "value": "Invalid Campus Selection"}
        }


        
        if (!classAlias.includes(Class)){
            return {"status": 500, "value": "Invalid Class Selection"}
        }

        formdata["UC_DERIVED_GST_STRM"] = Term
        formdata["ICAction"] = "UC_DERIVED_GST_SEARCH_PB"
        formdata["UC_DERIVED_GST_ENRL_STAT$chk"] = "C"
        formdata["UC_DERIVED_GST_SUBJECT"] = Class


        formBody = new URLSearchParams(formdata).toString();
        const thirdRequest = await session.post(this.url, formBody, { headers: this.header });

        const thrdRequestOutput =this.thirdRequestTestCases(thirdRequest.data, formdata["UC_DERIVED_GST_SUBJECT"])

        if (thrdRequestOutput > 0) {
            if (thrdRequestOutput === 350) {
                return {"status": thrdRequestOutput, "value": "0 results"}
            } else {
                return {"status": 500, "value": "Internal Error"}
            }
        }

        return {"status": 200, "value": thirdRequest.data}
    }

    firstRequestTestCases(html) {
        const dom = new JSDOM(html);
        const document = dom.window.document;

        let targetDiv = document.querySelector(".SSSGROUPBOXRIGHTLABEL");
        if (targetDiv === null) return 100
        if (!(targetDiv.textContent.includes("Search For Courses"))) return 100

        targetDiv = document.querySelector(".PABOLDBLUETEXT");
        if (targetDiv === null) return 100

        targetDiv = document.querySelector("#UC_DERIVED_GST_CAMPUS");
        if (targetDiv === null) return 100

        targetDiv = document.querySelector("#UC_DERIVED_GST_ACAD_CAREER");
        if (targetDiv === null) return 100

        targetDiv = document.querySelector("#UC_DERIVED_GST_STRM1");
        if (targetDiv === null) return 100

        targetDiv = document.querySelector("#UC_DERIVED_GST_SUBJECT");
        if (targetDiv === null) return 100

        return 0
    }

    secondRequestTestCases(html){
        const dom = new JSDOM(html);
        const document = dom.window.document;

        let targetDiv = document.querySelector("#app_label");
        if (targetDiv === null) return 200
        if (!(targetDiv.textContent.includes("Search Results"))) return 200

        targetDiv = document.querySelector("#ACE_UC_DERIVED_GST_COMBINED_SECTION")
        if (targetDiv === null) return 200

        targetDiv = document.querySelector("#ACE_width")
        if (targetDiv === null) return 200

        targetDiv = document.querySelector("#UC_CLASS_G_VW_SUBJECT\\$0");
        if (targetDiv === null) return 200
        if (!(targetDiv.textContent.trim() === "")) return 200

        return 0
    }

    thirdRequestTestCases(html, Class){
        const dom = new JSDOM(html);
        const document = dom.window.document;

        let targetDiv = document.querySelector(".popupText");
        if (targetDiv !== null) return 350

        targetDiv = document.querySelector("#UC_CLASS_G_VW_SUBJECT\\$0");
        if (targetDiv === null) return 300
        if (!(targetDiv.textContent.trim() === Class)) return 300
        
        return 0
    }

    htmlParser(html){
        // Parse the HTML using JSDOM
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Find all <tr> elements whose id starts with "trUC_CLASS_G_VW$0_row"
        const rows = document.querySelectorAll('tr[id^="trUC_CLASS_G_VW$0_row"]');
        
        const extractedClass = {}

        // Process the rows
        rows.forEach(row => {

            const crn = row.querySelector('span[id^="CLASS_LINK$span$"]')?.textContent.trim();
            const subject = row.querySelector('span[id^="UC_CLASS_G_VW_SUBJECT$"]')?.textContent.trim();
            const catalogNbr = row.querySelector('span[id^="UC_CLASS_G_VW_CATALOG_NBR$"]')?.textContent.trim();
            const classSection = row.querySelector('span[id^="UC_CLASS_G_VW_CLASS_SECTION$"]')?.textContent.trim();
            const academicCareer = row.querySelector('span[id^="UC_CLASS_G_VW_ACAD_CAREER$"]')?.textContent.trim();

            const units = row.querySelector('span[id^="UC_DERIVED_GST_UNITS_RANGE$"]')?.textContent.trim();
            const campus = row.querySelector('span[id^="CAMPUS_CLMN$"]')?.textContent.trim();

            const title = row.querySelector('span[id^="UC_CLASS_G_VW_DESCR$"]')?.textContent.trim();
            const requiredSections = row.querySelector('span[id^="UC_DERIVED_GST_DESCR50$"]')?.textContent.trim();
            const instructionMode = row.querySelector('span[id^="INSTRUCT_MODE_DESCR$"]')?.textContent.trim();

            const reservedSeats = row.querySelector('span[id^="UC_DERIVED_GST_HTMLAREA1$"]')?.textContent.trim();

            const professor = row.querySelector('span[id^="UC_DERIVED_GST_SSR_INSTR_LONG$"]')?.textContent.trim();
            const time = row.querySelector('span[id^="HRS_DAYS_LOC_CLMN$"]')?.textContent.trim();
            const enrollmentCap = parseInt(row.querySelector('span[id^="UC_CLASS_G_VW_ENRL_CAP$"]')?.textContent.trim());
            const enrollmentTot = parseInt(row.querySelector('span[id^="UC_CLASS_G_VW_ENRL_TOT$"]')?.textContent.trim());

            let availableSeats = null;

            if (!isNaN(enrollmentCap) && !isNaN(enrollmentTot)) {
                availableSeats = enrollmentCap - enrollmentTot;
            }

            let classDict = {
                crn,
                subject,
                catalogNbr,
                classSection,
                academicCareer,
                units,
                campus,
                title,
                requiredSections,
                instructionMode,
                professor,
                time,
                availableSeats,
                reservedSeats
            }

            // Save extracted data
            if (subject + " " + catalogNbr in extractedClass) {
                extractedClass[subject + " " + catalogNbr].push(classDict)
            } else {
                extractedClass[subject + " " + catalogNbr] = []
                extractedClass[subject + " " + catalogNbr].push(classDict)
            }
        });

        return {"status": 200, "value": extractedClass}
    }
}

async function Search(Class,Campus,Term) {
    const ClassInstance = new SearchBlock
    const output = await ClassInstance.search(Class,Campus,Term)
    return JSON.stringify(output)
}

export async function handler (event) {

    let payload;

    if (event.body) {
        payload = JSON.parse(event.body);
    } else {
        payload = event;
    }

    const { Class, Campus, Term } = payload;

    const output = await Search(Class,Campus,Term);
    return output
}