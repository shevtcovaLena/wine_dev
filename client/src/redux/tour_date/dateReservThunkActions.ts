import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ToursType } from '../ToursPage/toursTypes';

export const fetchTours = createAsyncThunk('date/all', async () => { // 'posts/all' = это не URL
  try {
    const response = await axios.get<ToursType>(`http://localhost:3009/api/tours/`); // URL ТУТ
    
    return response.data; //* это payload
  } catch (error) {
    console.log(error);
  }
});






