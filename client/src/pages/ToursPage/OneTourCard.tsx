import { Badge, Button, Card, Flex, Image, Space } from "antd";
const { Meta } = Card;
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OneTourCard({ tour, editBar }) {
  const navigate = useNavigate();
  
  function formatDaysString(days: number): string {
    if (days === 1) {
        return `${days} день`;
    } else if (days >= 2 && days <= 4) {
        return `${days} дня`;
    } else {
        return `${days} дней`;
    }
}
  return (
    <Flex justify="center" align="center" vertical>
      <Link to={`/tour/${tour.id}`} key={tour.id}>
      <Space direction="vertical" size="middle" >
      <Badge.Ribbon text={tour.region}>
      <Card
        hoverable
        style={{ width: 260, height: 420 }}
        // cover={<img alt="wine" src={`/public/images/${tour.path_img}`} />}
        cover={<div style={{overflow: 'hidden'}}>
          <img height={200} alt="wine" src={tour.path_img? `/public/images/${tour.path_img}`: 'mainFont3.jpg'} />
          </div>}
        bordered={true}
        // extra={tour.region}
      >
        <Flex vertical justify="space-between" style={{height: '160px'}}>
        <Meta
          title={tour.title}
          description={tour.description.slice(0, 100).concat("...")}
        />
        <Space>
        <Meta title={`${tour.price} рублей`} style={{textAlign:"right"}}/>
        <Meta
          title={formatDaysString(tour.length_days)} style={{textAlign:"right"}}
           
          
          // tour.length_days === 1
          // ? `${tour.length_days} день`
          // : `${tour.length_days} дней`
        />          
        </Space>
        </Flex>
      </Card>
      </Badge.Ribbon>
      </Space>
      </Link>
      {editBar && (
        <Flex wrap="wrap" gap="small" style={{marginTop: 20}}>
          <Button type="primary" onClick={() => navigate(`/tour_edit/${tour.id}`)}>
            Редактировать
          </Button>
          <Button danger>Отключить</Button>
        </Flex>
      )}
    </Flex>
  );
}
