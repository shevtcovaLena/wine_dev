import React, { useEffect, useState, useRef } from "react";
// import { DoubleRightOutlined, DownOutlined } from '@ant-design/icons';
// import type { TableColumnsType } from 'antd';
// import { ITour } from '../../redux/ToursPage/toursTypes';
// import { IUser } from '../../redux/userSlice';
// import { Link } from 'react-router-dom';
import {
  Badge,
  Dropdown,
  Space,
  Table,
  Button,
  Input,
  ConfigProvider,
} from "antd";
import axios from "axios";
import { tourDateType } from "../ReservPage/ReservPage";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

interface ToureDateDataType extends tourDateType {
  key: React.Key;
  status: "Завершен" | "Ожидается";
  start: string;
  end: string;
}

export default function AdminInnerTable({ tourId }: { tourId: number }) {
  const [toureDates, setToureDates] = useState([]);

  useEffect(() => {
    axios
      .get<tourDateType[]>(`http://localhost:3009/api/date//tour/${tourId}`)
      .then((response) => setToureDates(response.data))
      .catch((error) => console.log(error));
  }, []);

  const columns: TableColumnsType<ToureDateDataType> = [
    {
      title: "Дата начала",
      dataIndex: "start",
      key: "start",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
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

  // const data = [];
  // for (let i = 0; i < 3; ++i) {
  //   data.push({
  //     key: i.toString(),
  //     date: '2014-12-24 23:12:00',
  //     name: 'This is production name',
  //     upgradeNum: 'Upgraded: 56',
  //   });
  // }

  const data: ToureDateDataType[] = toureDates.map(
    (date: ToureDateDataType) => {
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
