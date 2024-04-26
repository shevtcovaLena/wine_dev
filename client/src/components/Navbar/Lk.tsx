import { useEffect } from 'react'
import AdminPage from "../../pages/AdminPage/AdminPage"
import TravelerPage from "../../pages/TravelerPage/TravelerPage"
import OrganizerPage from "../../pages/OrganizerPage/OrganizerPage"
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUserInfo } from '../../redux/thunkUserActions';

export function Lk() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((store) => store.userSlice.user);

    useEffect(() => {
        void dispatch(fetchUserInfo());
      }, [dispatch]);

  return (
    <>
    { user.role === 'traveler'?
        (<TravelerPage />):(<></>)}
    { user.role === 'organizer'?
        (<OrganizerPage/>):(<></>)}      
    { user.role === 'admin'?
        (<AdminPage />):(<></>)}      
    </>
  )
}
