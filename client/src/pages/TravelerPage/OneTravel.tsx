import React from 'react';
import { fetchDeleteTour } from '../../redux/Traveler_tours/travelerThunkActions';
import { useAppDispatch } from '../../redux/hooks';
import { Button, Card, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';

const cardStyle: React.CSSProperties = {
  width: 600,
  margin: '20px',
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 273,
};

export default function OneTravel({tour}) {

const dispatch = useAppDispatch();

  const deleteHandler = async (): Promise<void> => {
    void dispatch(fetchDeleteTour(tour.id));
  };

  
return(
    
<Card style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden'} }}>
    <Flex key={tour.id}>
      <img
        alt="wino"
        src={tour.tourImg? `http://localhost:3009/images/${tour.tourImg}`: 'mainFont3.jpg'}
        // src="../../../public/images/mockWine.jpg"
        style={imgStyle}
      />
      
      <Flex vertical align="flex-end" justify="space-between" style={{ padding: 30, margin: 10 }}>
        <Link to={`/tour/${tour.tourId}`}>
        <Typography.Title level={4}>
         {tour.tourTitle}<hr/>
        </Typography.Title>
        </Link>
        <Typography.Title level={5}>
        Дата тура: {new Date(tour.tourDateStart).toLocaleDateString()}-{new Date(tour.tourDateEnd).toLocaleDateString()}
        </Typography.Title>
        <Button type="primary" onClick={() => deleteHandler(tour.id)}>
          Удалить
        </Button>
      </Flex>
    </Flex>
 
  </Card>

    
      

);
}


