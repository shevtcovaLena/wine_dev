import { useEffect } from 'react'
import { ITour } from '../../redux/ToursPage/toursTypes'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchTours } from '../../redux/ToursPage/toursThunkActions'
import SideFilter from '../../components/SideFilter/SideFilter'
import style from "./TourPage.module.css"
// import { Link } from 'react-router-dom'

import OneTourCard from './OneTourCard'
import { Flex } from 'antd'



export default function ToursPage() {

const tours = useAppSelector(store => store.toursSlice.tours)

const dispatch = useAppDispatch();

useEffect(() => {
    void dispatch(fetchTours());
}, []);

  return (   
    <div className={style.tourContainer} >
      <SideFilter tours={tours}/>
       
      
      <Flex wrap="wrap" style={{ gap: '40px', margin: '20px 0'}} >
    {tours?.map((tour: ITour) => {
      
    if(tour.status === 'allowed'){
      return(
      <div key={tour.id}>
    <OneTourCard tour={tour} editBar={false} key={tour.id}/>
    </div>
  );
  }

})}
    
    </Flex>
    
    </div>
  )
}
