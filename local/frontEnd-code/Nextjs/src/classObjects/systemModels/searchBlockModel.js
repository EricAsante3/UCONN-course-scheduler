'use client';
import axios from 'axios';



export class SearchBlockModel {

    url = "https://xd3z212q15.execute-api.us-east-1.amazonaws.com/Dev/GetClasses"

    async search(Class, Term, Campus){
        if (Campus === "None" || Term === "None") {
            return JSON.stringify({"status": 459, "value": "Please select Term and Campus"})
        }

        try {
            const response = await axios.post(this.url, {
                "Class": Class,
                "Term": Term,
                "Campus": Campus
            }, {
            headers: {
                "Content-Type": "application/json",
            }
            });
            return response.data
        } catch (error) {
            return JSON.stringify({"status": 500, "value": "Internal Error"})
        }
    }
    
}