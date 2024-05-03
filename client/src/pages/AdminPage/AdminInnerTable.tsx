import React, { useEffect, useState } from "react";
import {
  Badge,
  Table,
  ConfigProvider,
} from "antd";
import axios from "axios";
import { tourDateType } from "../ReservPage/ReservPage";
import type { TableColumnsType } from "antd";

interface TourDateDataType extends tourDateType {
  key: React.Key;
  status: "Завершен" | "Ожидается";
  start: string;
  end: string;
}

export default function AdminInnerTable({ tourId }: { tourId: number }) {
  const [toureDates, setToureDates] = useState<tourDateType[]>([]);

  useEffect(() => {
    axios
      .get<tourDateType[]>(`http://localhost:3009/api/date//tour/${tourId}`)
      .then((response) => setToureDates(response.data))
      .catch((error) => console.log(error));
  }, []);

  const columns: TableColumnsType<TourDateDataType> = [
    {
      title: "Дата начала",
      dataIndex: "start",
      key: "start",
      sorter: (a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()),
    },
    { title: "Дата окончания", dataIndex: "end", key: "end" },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status === "Завершен" ? (
          <Badge status="error" text={status} />
        ) : (
          <Badge status="success" text={status} />
        );
      },
    },
    {
      title: "Количество мест всего",
      dataIndex: "quantity_seats",
      key: "quantity_seats",
    },
  ];


  const data: TourDateDataType[] = toureDates.map(
    (date: tourDateType) => {
      const status =
        new Date(date.date_end) > new Date() ? "Ожидается" : "Завершен";
      const start = new Date(date.date).toLocaleDateString();
      const end = new Date(date.date_end).toLocaleDateString();
      return { ...date, key: date.id, status, start, end };
    }
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: "rgb(199, 180, 180)",
            headerBg: "#E6E6E6",
          },
        },
      }}
    >
      <Table columns={columns} dataSource={data} pagination={false} />
    </ConfigProvider>
  );
}
