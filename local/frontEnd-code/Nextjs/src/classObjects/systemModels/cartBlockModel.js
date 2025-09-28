'use client';
import axios from 'axios';

export class CartBlockModel {

    url = "http://localhost:5041/Schedule"

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