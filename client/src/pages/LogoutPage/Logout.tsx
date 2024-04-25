import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { fetchLogoutUser } from '../../redux/thunkUserActions';


export function Logout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      void dispatch(fetchLogoutUser())
      navigate('/');
    }, []);

    return null;    
}