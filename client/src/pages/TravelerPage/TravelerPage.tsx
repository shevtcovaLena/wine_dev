import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { fetchTravelerTours } from '../../redux/Traveler_tours/travelerThunkActions'
import { Link } from 'react-router-dom';
import { Drawer, Flex, Rate, Button } from 'antd';
import OneTravel from './OneTravel'
import axios from 'axios';
import UserInfo from './UserInfo';
import Title from 'antd/es/typography/Title';
import { CalendarOutlined } from '@ant-design/icons';
import CalendarTraveler from '../../components/Calendar/CalendarTraveler';

type RatingRecordType = {
  [key: string]:{
    rated: boolean,
    rating: number,
  }}

export default function TravelerPage() {

  const travelerToursAll = useAppSelector(store => store.travelerSlice.travelerTours);

  const dispatch = useAppDispatch();
  useEffect(()=> {
    void dispatch(fetchTravelerTours());
  }, []);
  const currentDate = new Date();

  const currentUser = useAppSelector(state => state.userSlice.userInfo);
  const userId = currentUser ? currentUser.id : null; // здесь id юзера

  // const [ratedTours, setRatedTours] = useState({});

  const [tourRatings, setTourRatings] = useState<RatingRecordType>({});
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Получаем рейтинги туров из локального хранилища
    const savedRatings = JSON.parse(localStorage.getItem('tourRatings') || '{}');
    setTourRatings(savedRatings);
  }, []);

  const saveRatingToLocalStorage = (tourId: number, rating: number) => {
    // Сохраняем рейтинг тура в локальное хранилище
    const updatedRatings = { ...tourRatings, [tourId]: { rated: true, rating: rating } };
    console.log('Updated ratings:', updatedRatings);
    localStorage.setItem('tourRatings', JSON.stringify(updatedRatings));
    setTourRatings(updatedRatings);
  };

  const sendRatingToServer = async (userId: number, tourId: number, rating: number) => {
    try {
      const response = await axios.post('https://wine-server-shevtsova.amvera.io/api/ratings', {
        user_id: userId,
        tour_id: tourId,
        rate: rating
      });
      console.log('response ====',response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending rating:', error);
      throw new Error('Failed to send rating to the server.');
    }
  };

  const rateTour = (tourId: number, rating: number) => {
    if(userId) {
      saveRatingToLocalStorage(tourId, rating);    
      sendRatingToServer(userId, tourId, rating)      
    }
  };

  return (
    <Flex vertical align='center'>
    <Title style={{textAlign:'center', marginTop: '10px'}}>Личный кабинет пользователя</Title>
    <div style={{display:'flex', margin:'40px', flexWrap: 'wrap'}}>
    <UserInfo />
    </div>
    <Title level={3} style={{textAlign:'center'}}>Предстоящие поездки: 
    <Button type="link" onClick={showDrawer} style={{fontSize:"24px"}}>
         посмотреть на календаре <CalendarOutlined /> 
        </Button>
    </Title>
    <div style={{display:'flex', margin:'20px', flexWrap: 'wrap', justifyContent: 'center'}}> 
      {travelerToursAll?.filter(tour => new Date(tour.tourDateStart) >= currentDate).length === 0 ? (
          <div>Пока что нет запланированных туров &#128559;. <Link to="/tours">Перейти к подбору тура</Link></div>
        ) : (
          travelerToursAll?.filter(tour => new Date(tour.tourDateStart) >= currentDate).map(tour => (
            <OneTravel tour={tour} key={tour.id} />
          ))
        )}
      </div>
   

      <Title level={3} style={{textAlign:'center'}}>Вы посещали:</Title>
      <div style={{ display:'flex', flexWrap: 'wrap', margin:'20px'}}> {/* Фильтрация и отображение завершенных туров */}
      {travelerToursAll?.filter(tour => new Date(tour.tourDateStart) < currentDate).length === 0 ? (
          <p>Пока что нет посещенных туров &#128559;.</p>
        ) : (
          travelerToursAll?.filter(tour => new Date(tour.tourDateStart) < currentDate).map(tour => (
            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{ opacity: "0.6",filter: "brightness(0.9)", display:'flex', margin:'20px'}}>
                <OneTravel tour={tour} key={tour.id}  /> 
              </div>
              <div style={{ bottom: '10px', left: '10px', display: 'flex' }}>
                <span style={{ marginRight: '10px' }}>Как прошел тур {tour.tourTitle}? Оцените:</span>
                <Rate disabled={tourRatings[tour.tourId]?.rated} value={tourRatings[tour.tourId]?.rating} style={{ color: '#AC3A6D' }} onChange={value => rateTour(tour.tourId, value)}  />
              </div>
            </div>
          ))
        )}
      </div>
      <Drawer
        title="Мой календарь"
        placement={"right"}
        width={"70vw"}
        onClose={onClose}
        open={open}
      >
        <CalendarTraveler />
      </Drawer>
    </Flex>
  )
}
