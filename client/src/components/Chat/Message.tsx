// import React from "react";
import { Avatar, Card, Flex } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Paragraph from "antd/es/typography/Paragraph";
import { UserOutlined } from "@ant-design/icons";
import { IMessageData } from "./Chat";

// interface Props {}

function Message({ message, isAuthor, avatar }: {message: IMessageData, isAuthor: boolean, avatar: string | undefined}) {
  console.log(avatar? `http://localhost:3009/images/${avatar}` : "avatar.jpg")
  return (
    <>
      {isAuthor ? (
          <Flex justify="flex-start" gap='small' align="center" style={{margin: 10}} >
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={`http://localhost:3009/images/${avatar}`}
              alt="avatar"
            />
        <Card type={"inner"} style={{ minWidth: '60%', backgroundColor: '#D7F3D3', position: 'relative'}}>
          <Flex vertical justify="flex-start" style={{}}>
            <Title level={5} style={{ color: "#ac3a6d" }}>
              {message.userName}
            </Title>            
            <Text>{message.message}</Text>
            <Paragraph type='secondary' style={{position: 'absolute', bottom: -12, right: 5}}>{message.time}</Paragraph>
            </Flex>
        </Card>
          </Flex>
      ) : (
          <Flex justify="flex-end" gap='small' align="center" style={{margin: 10}}>            
        <Card type={"inner"} style={{ minWidth: '60%', position: 'relative', background: '#f0f0f0'}}>
          <Flex vertical justify="flex-end" style={{textAlign: 'right'}}>
            <Title level={5} style={{ color: "#ac3a6d" }}>
              {message.userName}
            </Title>
            <Text>{message.message}</Text>
            <Paragraph type='secondary' style={{position: 'absolute', bottom: -12, left: 5}}>{message.time}</Paragraph>
            
          </Flex>
        </Card>
        <Avatar
              size={64}
              src={"/public/avatar.jpg"}
              alt="avatar"
            />
          </Flex>
      )}
    </>
  );
}

export default Message;
