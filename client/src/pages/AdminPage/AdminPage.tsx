import React, { useEffect } from "react";
import { ITour } from "../../redux/ToursPage/toursTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTours  } from "../../redux/ToursPage/toursThunkActions";
import { ConfigProvider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import AdminCard from "./AdminCard";
import AdminTable from "./AdminTable";

export default function AdminPage() {
  const tours = useAppSelector(store => store.toursSlice.tours)
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchTours());
  }, []);

  return (
    <div>
      <br />
      <Title level={2}>Личный кабинет администратора</Title>
      <Title level={4}>Заявки на добавление туров</Title>
      <Flex wrap="wrap" gap="small">
        {tours?.map((tour: ITour) => {
          if (tour.status === "new") {
            return <AdminCard tour={tour} key={tour.id} />;
          }
        })}
      </Flex>
      <ConfigProvider
        theme={{          
          components: {
            Table: {
              // colorBgContainer: "#fff",
              borderColor: "rgb(199, 180, 180)",
              headerBg: "#EBDAA8"
            }
          }
        }}        
      >  
      <AdminTable/>
      </ConfigProvider>
    </div>
  );
}

