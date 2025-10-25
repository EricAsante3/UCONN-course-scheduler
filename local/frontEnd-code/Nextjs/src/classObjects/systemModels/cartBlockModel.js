'use client';
import axios from 'axios';

export class CartBlockModel {

    url = process.env.NEXT_PUBLIC_IP_URL + "/net-backend" + "/Schedule" 


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