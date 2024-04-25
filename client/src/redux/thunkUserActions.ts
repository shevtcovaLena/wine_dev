import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from './userSlice'
import { IUpdateInput } from "../components/ReservUserForm/ReservUserForm";

export const fetchRegUser = createAsyncThunk('user/reg', async (inputs: IUser) => {
    try {
        const response = await axios.post(`http://localhost:3009/api/user/reg`, inputs, {withCredentials: true });
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
})

export const fetchUpdateUser = createAsyncThunk('user/update', async (inputs: IUpdateInput) => {
    try {
        const response = await axios.patch(`http://localhost:3009/api/user/`, inputs, {withCredentials: true });
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
})

export const fetchLogUser = createAsyncThunk('user/log', async (inputs: IUser) => {
    try {
        const response = await axios.post(`http://localhost:3009/api/user/login`, inputs, {withCredentials: true });
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error);
    }
})

export const fetchUserInfo = createAsyncThunk('user/check', async () => {
    try {
        const response = await axios.get<IUser>('http://localhost:3009/api/user/', {withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const fetchUserFull = createAsyncThunk('user/full', async () => {
    try {
        const response = await axios.get<IUser>('http://localhost:3009/api/user/full', {withCredentials: true });
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const fetchLogoutUser = createAsyncThunk('user/logout', async () => {
    try {
        const response = await axios.get<IUser>('http://localhost:3009/api/user/logout', {withCredentials: true });
        if (response.status === 200) {
            return true
        }
    } catch (error) {
        console.log(error);
    }
})

