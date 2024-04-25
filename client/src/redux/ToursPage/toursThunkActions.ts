import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { ITour, ToursType } from './toursTypes';

export const fetchTours = createAsyncThunk('tours/all', async () => { // 'posts/all' = это не URL
  try {
    const response = await axios.get<ToursType>(`http://localhost:3009/api/tours/`); // URL ТУТ
    
    return response.data; //* это payload
  } catch (error) {
    console.log(error);
  }
});


export const fetchTourCancel = createAsyncThunk('tours/cancel', async (id : number) => {
  try {
    const response = await axios.patch<ToursType>(`http://localhost:3009/api//tour_edit/cancel/${id}`);
    if (response.status === 200) {
      return id
  }
   return false
  } catch (error) {
    console.log(error);
  }
});

export const fetchTourAllow = createAsyncThunk('tours/allow', async (id : number) => {
  try {
    const response = await axios.patch<ToursType>(`http://localhost:3009/api//tour_edit/allow/${id}`);
    if (response.status === 200) {
      return true
  }
  return false
  } catch (error) {
    console.log(error);
  }
});


// export const fetchFilterPost = createAsyncThunk('tours/filter', async () =>{
//   try {
    
//   } catch (error) {
//   console.log("filter", error);
//   }
// })




