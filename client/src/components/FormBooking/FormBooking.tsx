import React, { useState } from "react";
import {
  Button,
  // DatePicker,
  Form,
  InputNumber,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Text from "antd/es/typography/Text";
import { WarningOutlined } from "@ant-design/icons";
import { IUser } from "../../redux/userSlice";
import { TourDateType } from "../../pages/TourPage/TourPage";
import { MessageType } from "antd/es/message/interface";
import { useDispatch } from "react-redux";
import { setQuantitySeats } from "../../redux/form_booking/formBookingSlice";

// const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

interface IMessageApi {
  open: (config: MessageType) => void;
  destroy: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  return date.toLocaleDateString("ru-RU", options);
};

interface FormBookingProps {
  tourDates: TourDateType[];
  // currentIndex: number;
  // updateCurrentIndex: (index: number) => void;
  messageApi: IMessageApi;
}

const FormBooking: React.FC<FormBookingProps> = ({ tourDates, messageApi }) => {
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const user: IUser = useAppSelector((store) => store.userSlice.user);
  
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const handleDateChange = (dateString: string) => {
    // Находим индекс выбранной даты в массиве tourDates
    const index = tourDates.findIndex(
      (tourDate) => String(tourDate.date) === dateString
    );
    setCurrentIndex(index);
    updateCurrentIndex(index); // Обновление currentIndex в родительском компоненте
  };

  const [dateId, setDateId] = useState(null);
  const [availabilityStr, setAvailability] = useState("");

  const onChangeSelect = (value, option) => {
    setDateId(() => option.key);

    const tourDate = tourDates.filter((el) => el.id === Number(option.key));

    const availabilityStrTemp = `Свободно ${
      tourDate[0].quantity_seats - tourDate[0].Reservation_tours.length
    } из ${tourDate[0].quantity_seats}`;
    setAvailability(() => availabilityStrTemp);
  };

  const [valueSeat, setValueSeat] = useState(1);
  const onNumberSeat = (value: number) => {
    setValueSeat(() => value)
  };

  const btnOnClick = () => {
    // const httpNav = {id:dateId,seat:valueSeat}

    if (user.full_name === "") {
      messageApi.open({
        type: "error",
        content:
          "Для бронирования тура необходимо войти или зарегистрироваться.",
      });
      setMsg(
        () => " Для бронирования тура необходимо войти или зарегистрироваться."
      );
    } else if (dateId === null) {
      messageApi.open({
        type: "error",
        content: "Выберите дату тура.",
      });
      setMsg(() => " Выберите дату тура.");
    }

    if (user.full_name && dateId !== null) {
      dispatch(setQuantitySeats(valueSeat))
      navigate(`/tour/date/${dateId}`, { state: { seat: valueSeat } });
    } else {
      setShowMsg(true);
    }
  };

  // console.log('currentIndex:', currentIndex);
  // console.log('quantitySeats:', quantitySeats);
  // console.log('Seats for current index:', quantitySeats[currentIndex]);
  return (
    <div>
      <Form {...formItemLayout} variant="filled"></Form>
      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item label="Выбор даты" name="Select" onChange={handleDateChange}>
          <Select onChange={onChangeSelect}>
            {tourDates.map((date) => (
              <Select.Option
                key={date.id}
                value={`${formatDate(date.date)} - ${formatDate(
                  date.date_end
                )}`}
              >
                {`${formatDate(date.date)} - ${formatDate(date.date_end)}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Участников:">
          <InputNumber
            defaultValue={1}
            min={1}
            style={{ maxWidth: 200 }}
            name='seets'
            value={valueSeat}
            onChange={onNumberSeat}
          />
        </Form.Item>

        <Form.Item name="availability" wrapperCol={{ offset: 6, span: 16 }}>
          <span style={{ color: "red", fontWeight: "bold", marginRight: 50 }}>
            {availabilityStr}{" "}
          </span>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={btnOnClick}
            style={{
              height: 48,
              maxWidth: 300,
              marginTop: -30,
              marginLeft: 30,
              alignItems: "center",
            }}
          >
            Забронировать
          </Button>
        </Form.Item>
        {showMsg ? (
          <Text type="danger">
            <WarningOutlined />
            {msg}
          </Text>
        ) : (
          <></>
        )}
      </Form>
    </div>
  );
};

export default FormBooking;
