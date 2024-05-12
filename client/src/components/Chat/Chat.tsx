import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/userSlice";
import { Button, Flex, Input } from "antd";
import Message from "./Message";
import React from "react";

export interface IMessageData {
  userName: string;
  message: string;
  room?: number;
  time: string;
}

const containerStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "1000px",
  height: "50vh",
  overflow: "auto",
  border: "1px solid #ac3a6d",
  backgroundColor: "#FCF3D8",
};

const style: React.CSSProperties = {
  width: "100%",
  height: 2000,
};

const Chat = ({ tourId }: { tourId: number }) => {
  const [messages, setMessages] = useState<IMessageData[]>([]);
  const [message, setMessage] = useState("");
  // const [room, setRoom] = useState("");

  const newSocket = io("http://localhost:3009");
  const user: IUser = useAppSelector((state) => state.userSlice.user);

  useEffect(() => {
    if (user.full_name) {
      newSocket.emit("join", {
        tourId: tourId,
        userName: user.full_name,
      });
      // setRoom(String(tourId));
    }
  }, [user.full_name]);

  useEffect(() => {
    newSocket.on("message", ({ data }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [newSocket]);

  const sendMessage = () => {
    if (newSocket && message) {
      newSocket.emit("sendMessage", {
        data: {
          message,
          userName: user.full_name,
          room: tourId,
          time: new Date().toLocaleTimeString().slice(0, 5),
        },
      });
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: "2000px", margin: "20 0" }}>
      <div style={containerStyle}>
        <div style={style}>
          {user.role !== "organizer"
            ? messages.map((message: IMessageData, index: number) => (
                <div key={index}>
                  <Message
                    message={message}
                    isAuthor={message.userName === user.full_name}
                    avatar={user.avatar}
                  />
                </div>
              ))
            : messages
                .filter((msg) => msg.userName !== "Админ")
                .map((message: IMessageData, index: number) => (
                  <div key={index}>
                    <Message
                      message={message}
                      isAuthor={message.userName === user.full_name}
                      avatar={user.avatar}
                    />
                  </div>
                ))}
        </div>
      </div>
      <Flex justify="center" gap="large" style={{ margin: "20px 0" }}>
        <Input
          style={{ maxWidth: "70%" }}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="primary" onClick={sendMessage}>
          Отправить
        </Button>
      </Flex>
    </div>
  );
};

export default Chat;
