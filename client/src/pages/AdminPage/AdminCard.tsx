import { CheckOutlined, CloseOutlined } from "@ant-design/icons/lib/icons";
import { Button, Card, Flex } from "antd";
const { Meta } = Card;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchTourAllow, fetchTourCancel } from "../../redux/ToursPage/toursThunkActions";
import Text from "antd/es/typography/Text";
import OneTourCard from "../ToursPage/OneTourCard";

export default function AdminCard({ tour }) {
const [statusCancelMsg, setCancelMsg] = useState('')
const [statusAllowMsg, setAllowMsg] = useState('')

    const dispatch = useAppDispatch();

    const handleCancel = (id: number) => {
        void dispatch(fetchTourCancel(id));
        setAllowMsg(() => "");
        setCancelMsg(() => "Заявка отклонена"); //достаточно ли для отображения на странице
      };
    
      const handleAllow = (id: number) => {
        void dispatch(fetchTourAllow(id)); //достаточно ли для отображения на странице
        setCancelMsg(() => "")
        setAllowMsg(() => "Заявка одобрена");
      };

  return (
    <div>
      <Flex gap="small" justify="center" vertical>
        <Link to={`/tour/${tour.id}`} key={tour.id}>
          <div key={tour.id}>
            {/* <OneTourCard tour={tour} key={tour.id} /> */}
          </div>

          <OneTourCard tour={tour}/>
        </Link>
        <Flex gap="small" justify="center">
          <Button
            type="primary"
            onClick={() => handleAllow(tour.id)}
            icon={<CheckOutlined />}
          >
            Одобрить
          </Button>
          <Button
            danger
            onClick={() => handleCancel(tour.id)}
            icon={<CloseOutlined />}
          >
            Отменить
          </Button>
        </Flex>
        <Flex gap="small" justify="center">
          <Text type="warning">{statusCancelMsg}</Text>
          <Text type="success">{statusAllowMsg}</Text>
        </Flex>
      </Flex>
    </div>
  );
}
