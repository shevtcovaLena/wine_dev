import { createSlice } from "@reduxjs/toolkit";
import { fetchLogUser, fetchLogoutUser, fetchRegUser, fetchUpdateUser, fetchUserFull, fetchUserInfo } from "./thunkUserActions";


export interface IUser {
    id?: number,
    full_name:string,
    email?:string,
    telephone?:string,
    role: string,
    password?: string,
    avatar?: string, 
}

export type UserStateType = {
    user: IUser,
    userInfo: IUser,
    logStatus: boolean,
    open: boolean,
    msg: string,
}

export const initialUser: IUser = {
    full_name:'',
    email:'',
    telephone:'',
    role: '',
    password: '',        
}

const initialState: UserStateType = {
    user: initialUser,
    userInfo: initialUser,
    logStatus: false,
    open: false,
    msg:'',
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchRegUser.fulfilled, (state, { payload }) => {
            if(payload.err) {
                state.msg = payload.err
            } else {
                state.user = payload;
                state.logStatus=true;
                state.msg = ''
            }
        })
        builder.addCase(fetchUpdateUser.fulfilled, (state, { payload }) => {
            if(payload.err) {
                state.msg = payload.err
            } else {
                state.user = payload;
                // state.logStatus=true;
                state.msg = ''
            }
        })
        builder.addCase(fetchLogUser.fulfilled, (state, { payload }) => {
            if(payload.err) {
                state.msg = payload.err                
            } else {
                state.user = payload;
                state.logStatus=true;
                state.msg = ''
            }
        })
        builder.addCase(fetchUserInfo.fulfilled, (state, { payload })=> {
            if (payload)
            state.user = payload;
            state.logStatus=true
        })
        builder.addCase(fetchUserFull.fulfilled, (state, { payload })=> {
            if (payload)
            state.userInfo = payload;            
        })
        builder.addCase(fetchLogoutUser.fulfilled, (state, { payload })=> {
            if (payload)
            state.user = initialUser;
            state.logStatus = false
        })
    },
    reducers: {
        show(state) {
          state.open = true;
        },
        hide(state) {
          state.open = false;
        },
    }
}
)

export default userSlice.reducer;
export const { show, hide } = userSlice.actions;
