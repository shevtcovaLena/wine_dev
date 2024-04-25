import React from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";
import { useAppSelector } from "../../redux/hooks";

const CalendarTraveler: React.FC = () => {
  const travelerToursAll = useAppSelector(
    (store) => store.travelerSlice.travelerTours
  );

  console.log(travelerToursAll);
  const getListData = (value: Dayjs) => {
    let listData;
    console.log(new Date(value.format("YYYY-MM-DD"))); // "2024-05-12T00:00:00.000Z"
    const tempDate = value.format("YYYY-MM-DD");
    const tourDate = travelerToursAll.filter((el) =>
      el.tourDateStart.includes(tempDate)
    );

    const listDataTemp = [];

    for (const iterator of tourDate) {
      if (new Date(iterator.tourDateStart) < new Date()) {
        listDataTemp.push({ type: "error", content: iterator.tourTitle });
      } else {
        listDataTemp.push({ type: "success", content: iterator.tourTitle });
      }
    }

    if (listDataTemp.length) {
      listData = listDataTemp;
    }

    return listData || [];
  };

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalendarTraveler;
