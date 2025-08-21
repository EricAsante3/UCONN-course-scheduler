'use client';
import axios from 'axios';

export class CartBlockModel {

    url = "https://xd3z212q15.execute-api.us-east-1.amazonaws.com/Dev/Schedule"

    async schedule(preProccedClassed){
        try {
            const response = await axios.post(this.url, preProccedClassed, {
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