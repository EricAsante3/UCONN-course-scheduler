'use client';
import axios from 'axios';



export class SearchBlockModel {

    url = "https://xd3z212q15.execute-api.us-east-1.amazonaws.com/Dev/GetClasses"

    async search(Class, Term, Campus){
        console.log({
                "Class": Class,
                "Term": Term,
                "Campus": Campus
            })
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
            return {"status": 500, "message": "Internal Error"}
        }
    }
    
}