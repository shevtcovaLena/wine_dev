import React, { useEffect, useState } from "react";
import { Card, Collapse, Flex, List, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OneTourCard from "../ToursPage/OneTourCard";
import UserInfo from "../TravelerPage/UserInfo";
import Chat from "../../components/Chat/Chat";
import { useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/userSlice";
import { ITour } from "../../redux/ToursPage/toursTypes";

const { Text } = Typography;

type arrReservType = {
  id: number;
  name: string;
  tel: string;
};

interface IOrgToursData {
  id: number;
  title: string;
  link: string;
  arrReserv: arrReservType[];
}

export default function OrganizerPage() {
  const navigate = useNavigate();
  const [data, setData] = useState<IOrgToursData[]>([]);
  const [tours, setTours] = useState<ITour[]>();

  const user: IUser = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    fetchTourData().then((tourData) => {
      console.log(tourData);
      setData(tourData);
    });

    fetchTours().then((tours) => {
      setTours(tours);
    });
  }, []);

  const fetchTourData = async () => {
    const response = await axios.get(
      "http://localhost:3009/api/organizer/active",
      { withCredentials: true }
    );
    return response.data;
  };

  const fetchTours = async () => {
    const response = await axios.get(
      "http://localhost:3009/api/organizer/tours",
      { withCredentials: true }
    );
    return response.data;
  };

  const enumStatus: Record<"new" | "allowed" | "canceled", React.ReactNode> = {
    new: <Text>Новый</Text>,
    allowed: <Text type="success">Подтвержден</Text>,
    canceled: <Text type="danger">Отключен</Text>,
  };

  return (
    <Flex justify="center" style={{ marginTop: 20 }}>
      <Flex align="start" justify="center" gap={50} wrap="wrap">
        <Flex vertical>
          <Card title="Заявки" bordered={false} style={{ maxWidth: 1000 }}>
            {data.map((el) => {
              return (
                <Collapse accordion>
                  <Collapse.Panel
                    header={<Link to={el.link}>{el.title}</Link>}
                    key={el.id}
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={el.arrReserv}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.name}
                            description={`${item.tel}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Collapse.Panel>
                </Collapse>
              );
            })}
          </Card>
          <br />
          <Card title="Мои туры" bordered={false} style={{ maxWidth: 1000 }}>
            <Flex vertical gap="large" justify="center" align="center">
              <Button
                style={{ width: "28%" }}
                type="primary"
                block
                onClick={() => navigate("/tour_edit/-1")}
              >
                Добавить тур
              </Button>
            </Flex>
            <br />
            <Flex wrap="wrap" gap={80}>
              {tours?.map((tour: ITour) => (
                <div key={tour.id}>
                  {enumStatus[tour.status]}
                  <OneTourCard tour={tour} editBar={true} key={tour.id} />
                </div>
              ))}
            </Flex>
          </Card>
        </Flex>
        <div>
          <UserInfo />
          <br />
          <Card title="Чат" bordered={false}>
            <Chat tourId={user.id as number} />
          </Card>
        </div>
      </Flex>
      {/* </Card> */}
    </Flex>
  );
}
