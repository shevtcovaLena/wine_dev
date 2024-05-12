// import React from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons/lib/icons";
import { Button, Flex } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import {
  fetchTourAllow,
  fetchTourCancel,
} from "../../redux/ToursPage/toursThunkActions";
import Text from "antd/es/typography/Text";
import OneTourCard from "../ToursPage/OneTourCard";
import { ITour } from "../../redux/ToursPage/toursTypes";

export default function AdminCard({ tour }: { tour: ITour }) {
  const [statusCancelMsg, setCancelMsg] = useState("");
  const [statusAllowMsg, setAllowMsg] = useState("");

  const dispatch = useAppDispatch();

  const handleCancel = (id: number) => {
    void dispatch(fetchTourCancel(id));
    setAllowMsg(() => "");
    setCancelMsg(() => "Заявка отклонена"); 
  };

  const handleAllow = (id: number) => {
    void dispatch(fetchTourAllow(id)); 
    setCancelMsg(() => "");
    setAllowMsg(() => "Заявка одобрена");
  };

  return (
    <div>
      <Flex gap="small" justify="center" vertical>
        <Link to={`/tour/${tour.id}`} key={tour.id}>
          <div key={tour.id}>
            <OneTourCard tour={tour} editBar={false} />
          </div>
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
