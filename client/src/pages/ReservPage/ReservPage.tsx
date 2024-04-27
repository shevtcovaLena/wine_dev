import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Col, Divider, Form, Row, Typography } from "antd";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ITour } from "../../redux/ToursPage/toursTypes";
import { fetchTours } from "../../redux/ToursPage/toursThunkActions";
import { IUser } from "../../redux/userSlice";
import ReservUserForm, { IUpdateInput } from "../../components/ReservUserForm/ReservUserForm";
import { fetchUpdateUser } from "../../redux/thunkUserActions";

export interface tourDateType {
  id: number;
  tour_id: number;
  date: Date;
  date_end: Date;
  quantity_seats: number;
};

const initTourDate = {
  id: 0,
  tour_id: 0,
  date: null,
  quantity_seats: 0,
};

export function ReservPage() {
  const { id } = useParams();
  const location = useLocation();
  console.log(location)
  const [dateTour, setDateTour] = useState<tourDateType>(initTourDate);
  const [reservCount, setReservCount] = useState<number>(0);
  const [tourInfo, setTourInfo] = useState<ITour>({});
  const [userInfo, setUserInfo] = useState<IUser>({});

  const userSession: IUser = useAppSelector((store) => store.userSlice.user);
  
  const { Title, Text } = Typography;

  const allTours: ITour[] = useAppSelector(
    (store) => store.toursSlice.toursDefault
  );

  const dispatch = useAppDispatch();

  const initUpdateInputs = {
    full_name: '',
    telephone: '',
    number:location.state.seat,        
  }
  
  const navigate = useNavigate();
  const [form] = Form.useForm<IUpdateInput>();
  
  const [inputs, setInputs] = useState<IUpdateInput>(initUpdateInputs);
  const [reservFetchBody, setReservFetchBody] = useState({});

  useEffect(() => {
    void dispatch(fetchTours());
    axios
      .get<tourDateType>(`http://localhost:3009/api/date/${id}`)
      .then((response) => setDateTour(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get<tourDateType>(`http://localhost:3009/api/user/${userSession.id}`)
      .then((response) => setUserInfo(response.data))
      .catch((error) => console.log(error));
  }, [userSession]);

  useEffect(() => {
    const tour: ITour | unknown = allTours.find(
      (tour) => tour.id === dateTour.tour_id
    );
    setTourInfo(() => tour as ITour);
  }, [dateTour, allTours]);

  useEffect(() => {
    axios
      .get<number>(`http://localhost:3009/api/reserv/date/${dateTour.id}`)
      .then((response) => setReservCount(response.data))
      .catch((error) => console.log(error));
  }, [dateTour, reservCount]);
  
  
  ////-------------------------------------------------------------------------
   
  useEffect(() => {
    setInputs(() => ({ full_name: userInfo.full_name, telephone: userInfo.telephone }));
    form.setFieldsValue(inputs)    
  }, [userInfo]);

  useEffect(() => {
    form.setFieldsValue(inputs)
    setReservFetchBody(()=> ({ 
      id: dateTour.id,
      date: dateTour.date,
      date_end: dateTour.date_end,
      number: inputs.number || 1,
    }))    
  }, [inputs]);
  
  const handleSubmit = async () => {   
    try {
      await form.validateFields();
      void dispatch(fetchUpdateUser(inputs as IUpdateInput));
      const response = await axios.post(`http://localhost:3009/api/reserv/`, reservFetchBody, {withCredentials: true });
      if (response.status === 200) {
        navigate('/lk');        
        }              
    } catch (error) {
      console.log(error);
    }
  };
  
  const formStateHandler = () => {
    setInputs(() => form.getFieldsValue());
  };

  const getDayName = (date: Date) => {
    const dayNumber = date.getDay();
  switch (dayNumber) {
    case 0:
      return 'Воскресенье';
    case 1:
      return 'Понедельник';
    case 2:
      return 'Вторник';
    case 3:
      return 'Среда';
    case 4:
      return 'Четверг';
    case 5:
      return 'Пятница';
    case 6:
      return 'Суббота';
    default:
      return 'Неизвестный день недели';
  }
  } 

  const discount: number = (price: number, number: number) => {
    if (number === 1) {
      return 0
    }
    if (number <= 5) {
      return price*number*5/100
    }
      return price*number*10/100
    }
  
  return (
    <>
      <Row>
        <Col span={16} style={{ padding: "8px" }}>
          <Card title="Детали бронирования" bordered={false}>
            <Divider orientation="left" orientationMargin="0">
              Информация о туре
            </Divider>
            <p>
              {tourInfo?.title}, {tourInfo?.region}
            </p>
            <p>
              {tourInfo?.description}
            </p>
            <Divider orientation="left" orientationMargin="0">
              Даты тура
            </Divider>
            <p>
              Длительность <strong>{tourInfo?.length_days}</strong> дней
            </p>
            <p>
              {new Date(dateTour.date).toLocaleDateString()} -{" "}
              {new Date(dateTour.date_end).toLocaleDateString()}
            </p>
            <Divider orientation="left" orientationMargin="0">
              Занято мест
            </Divider>
            <p>
              {reservCount}/{dateTour.quantity_seats}
            </p>
            <Divider orientation="left" orientationMargin="0">
              Основные данные для бронирования
            </Divider>
            <p>
              Имя: {userInfo.full_name}
              <br />
              Email: {userInfo.email}
              <br />
              Тел.: {userInfo.telephone}
            </p>
          </Card>
          <div style={{ height: '10px'}}></div>
          <Card title="Подтвердите ваши данные" bordered={false}>
            <ReservUserForm
              // user={userInfo}
              maxSeets={dateTour.quantity_seats - reservCount}
              form = { form }
              handleSubmit = { handleSubmit }
              formStateHandler = { formStateHandler }
              inputs = { inputs }
              // dateTour={dateTour}
            />
            <p>
              {tourInfo?.title}, {tourInfo?.region}
            </p>
          </Card>
        </Col>
        <Col span={8} style={{ padding: "8px", textAlign: "left" }}>
          <Card title="Ваша бронь" bordered={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <Title level={4}>{tourInfo?.title} <br/><Text type="secondary">({tourInfo?.region})</Text></Title>
          
          <Text>Цена: {Math.ceil(tourInfo?.price)} ₽ </Text>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Title level={5}>Дата начала:</Title>
          <Text >{(new Date(dateTour?.date)).toLocaleDateString()} ({getDayName(new Date(dateTour?.date))})</Text>
          <Title level={5}>Дата окончания:</Title>
          <Text >{(new Date(dateTour?.date_end)).toLocaleDateString()} ({getDayName(new Date(dateTour?.date_end))})</Text>
        </div>
           <div style={{ borderBottom: "2px solid lightgrey" }}></div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: "column" }}>
           <Title level={4} >{inputs?.number || location.state.seat} </Title> 
           <Text type="secondary" style={{ marginTop: "-15px", marginBottom: "20px"}}>количество человек</Text> 
           <Text>✖️</Text> 
           <Title level={4} >{Math.ceil(tourInfo?.price)} ₽</Title>
           <Text type="secondary" style={{ marginTop: "-15px", marginBottom: "0"}}>цена тура</Text> 
           <Title level={3} style={{ margin: "0", marginBottom: "-10px"}}>=</Title> 
           <Title level={4} type="secondary" delete>{(tourInfo?.price*(inputs?.number || location.state.seat)).toFixed(0)} ₽</Title>
           <Text type="secondary" style={{ marginTop: "-15px", marginBottom: "20px"}}>сумма</Text> 
           <Text>➖</Text> 
           <Title level={4} >{(discount(tourInfo?.price, (inputs?.number || location.state.seat))).toFixed(0)} ₽</Title>
           <Text type="secondary" style={{ marginTop: "-15px", marginBottom: "20px"}}>скидка за групповой заказ</Text> 
           <div style={{ borderBottom: "2px solid lightgrey" }}></div>
           <Title level={3} >Сумма: {(tourInfo?.price*(inputs?.number || location.state.seat) - discount(tourInfo?.price, (inputs?.number || location.state.seat))).toFixed(0)} ₽</Title>
        </div>
          </Card>
        </Col>
        </Row>
    </>
  );
}
