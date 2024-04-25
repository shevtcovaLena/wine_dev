import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import io from "socket.io-client";
import { useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/userSlice";
import { Button, Flex, Input } from "antd";
import Message from "./Message";
import React from "react";


interface IMessageData {
    data: {
        userName: string,
        message: string, 
        room?: number,
    }
}

const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '1000px',
    height: "50vh",
    overflow: 'auto',
    border: '1px solid #ac3a6d',
    backgroundColor: '#FCF3D8'
  };
  
  const style: React.CSSProperties = {
    width: '100%',
    height: 2000,
  };

const Chat = ({ tourId }) => {
  //   const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  const newSocket = io("http://localhost:3009");
  const user: IUser = useAppSelector((state) => state.userSlice.user);


  useEffect(() => {
    if (user.full_name) {
      newSocket.emit("join", { tourId, userName: user.full_name });
      setRoom(tourId);
    }
  }, [user.full_name]);

  useEffect(() => {
    newSocket.on("message", ({ data }) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    // return () => {
    //   newSocket.disconnect();
    // };
  }, [newSocket]);

    // useEffect(() => {
    //   //Обработчик события подключения
    //   newSocket.on('connect', () => {
    //     console.log('Подключено к серверу чата');
    //   });

  //     // Обработчик события получения сообщения
  //     // newSocket.on('message', (message: string) => {
  //     //   setMessages((prevMessages) => [...prevMessages, message]);
  //     // });

  //     // Обработчик события отключения
  //     newSocket.on('disconnect', () => {
  //       console.log('Отключено от сервера чата');
  //     //   setSocket(null);
  //     });

  //     // Отключение сокета при размонтировании компонента
    //   return () => {
    //     newSocket.disconnect();
    //   };
    // }, []);

  const sendMessage = () => {
    if (newSocket && message) {
      newSocket.emit("sendMessage", {
        data: { message, userName: user.full_name, room , time: new Date().toLocaleTimeString().slice(0,5)},
      });
      setMessage("");
    }
  };
  
const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

     return (
        <div style={{ maxWidth: '2000px', margin: '20 0'}}>
      <div style={containerStyle} ref={setContainer}>
        <div style={style}>
        {user.role !== 'organizer' ? messages.map((message: IMessageData, index: number) => (
            <div key={index}>
          <Message message = { message } isAuthor={ message.userName === user.full_name } avatar={user.avatar} />
          </div>))
          :
          messages.filter((msg) => (msg.userName !== 'Админ')).map((message: IMessageData, index: number) => (
            <div key={index}>
          <Message message = { message } isAuthor={ message.userName === user.full_name } avatar={user.avatar} />
          </div>))}          
        </div>
      </div>
      <Flex justify="center" gap='large' style={{margin: '20px 0'}}>
        <Input
        style={{maxWidth: '70%'}}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
         <Button type="primary" onClick={sendMessage}>Отправить</Button>
      </Flex>
      </div>
  );
};

export default Chat;
