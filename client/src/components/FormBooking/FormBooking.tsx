import React, { useState } from "react";
import { Button, Form, InputNumber, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Text from "antd/es/typography/Text";
import { WarningOutlined } from "@ant-design/icons";
import { IUser } from "../../redux/userSlice";
import { TourDateType } from "../../pages/TourPage/TourPage";
import { MessageInstance } from "antd/es/message/interface";
import { useDispatch } from "react-redux";
import { setQuantitySeats } from "../../redux/form_booking/formBookingSlice";
import { OptionProps } from "antd/es/select";
import { valueType } from "antd/es/statistic/utils";
// import { valueType } from "antd/es/statistic/utils";

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  return date.toLocaleDateString("ru-RU", options);
};

type TourDateReservType = {
  Reservation_tours: {
    id: number,
    user_id: number,
    tour_date_id: number,
    date: string,
    date_end: string,
    createdAt: string,
    updatedAt: string,
  }[];
} & TourDateType;

interface FormBookingProps {
  tourDates: TourDateReservType[];
  messageApi: MessageInstance;
}

const FormBooking: React.FC<FormBookingProps> = ({ tourDates, messageApi }) => {
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const user: IUser = useAppSelector((store) => store.userSlice.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [dateId, setDateId] = useState(null);
  const [availabilityStr, setAvailability] = useState("");

  const onChangeSelect = (value: valueType, option: OptionProps) => {
    setDateId((pre) => (option.key ? option.key : pre));

    const tourDate = tourDates.filter((el) => el.id === Number(option.key));

    const availabilityStrTemp = `Свободно ${
      tourDate[0].quantity_seats - tourDate[0].Reservation_tours.length
    } из ${tourDate[0].quantity_seats}`;
    setAvailability(() => availabilityStrTemp);
  };

  const [valueSeat, setValueSeat] = useState(1);
  const onNumberSeat = (value: number | null) => {
    setValueSeat((pre) => (value ? value : pre));
  };

  const btnOnClick = () => {
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
      dispatch(setQuantitySeats(valueSeat));
      navigate(`/tour/date/${dateId}`, { state: { seat: valueSeat } });
    } else {
      setShowMsg(true);
    }
  };

  return (
    <div>
      <Form {...formItemLayout} variant="filled"></Form>
      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item label="Выбор даты" name="Select">
          <Select
            onChange={(value: valueType, option: OptionProps | OptionProps[]) =>
              onChangeSelect(value, option as OptionProps)
            }
          >
            {tourDates.map((date) => (
              <Select.Option
                key={date.id}
                value={`${formatDate(String(date.date))} - ${formatDate(
                  date.date_end
                )}`}
              >
                {`${formatDate(String(date.date))} - ${formatDate(
                  date.date_end
                )}`}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Участников:">
          <InputNumber
            defaultValue={1}
            min={1}
            style={{ maxWidth: 200 }}
            name="seets"
            value={valueSeat}
            onChange={(value) => onNumberSeat(value)}
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
