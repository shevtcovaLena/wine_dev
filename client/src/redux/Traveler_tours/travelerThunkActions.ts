import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AxiosResponse } from "axios";
import { TravelerToursType } from "./travelerTourTypes";


//запрос на вытягивание всех броней 
export const fetchTravelerTours = createAsyncThunk('travelerTours/all', async ()=> {
    try {
        const response = await axios.get<TravelerToursType>(`http://localhost:3009/api/traveler`, {withCredentials: true });
        
        return response.data;
    } catch (error) {
        console.log('ошибка запроса броней', error);
    }  
})

export const fetchDeleteTour = createAsyncThunk('travelerTours/del', 

async (id: number) => {
  const response = await axios.delete(`http://localhost:3009/api/traveler/${id}`,{withCredentials: true });
  if (response.status === 200) {
    return id;
  }
});