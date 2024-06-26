import { MenuProps } from "antd";
import React, { useEffect } from "react";
// import styles from './Navbar.module.css';
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUserInfo } from "../../redux/thunkUserActions";


import { show } from "../../redux/userSlice";
import { Menu } from "antd";
import "./NavbarMenu.css";
import Avatar from "antd/es/avatar/avatar";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


export function Navbar() {
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(show());
  };

const items: MenuItem[] = [
  getItem(<Link to="/">На главную</Link>, '1', ),
  getItem(<Link to="/tours">Подбор тура</Link>, '2', ),
  getItem(<a onClick={showModal}>Вход</a>, '5', ),
];

const itemsTraveler: MenuItem[] = [
  getItem(<Link to="/">На главную</Link>, '1', ),
  getItem(<Link to="/tours">Подбор тура</Link>, '2', ),
  getItem(<Link to="/lk">Личный кабинет</Link>, '4', ),
  getItem(<Link to="/logout">Выход</Link>, '5', ),
];

const itemsOrganize: MenuItem[] = [
  getItem(<Link to="/">На главную</Link>, '1', ),
  getItem(<Link to="/tours">Подбор тура</Link>, '2', ),
  getItem(<Link to="/lk">Личный кабинет</Link>, '4', ),
  getItem(<Link to="/logout">Выход</Link>, '5', ),
];

const itemsAdmin: MenuItem[] = [
  getItem(<Link to="/">На главную</Link>, '1', ),
  getItem(<Link to="/tours">Подбор тура</Link>, '2', ),
  getItem(<Link to="/lk">Личный кабинет</Link>, '4', ),
  getItem(<Link to="/logout">Выход</Link>, '5', ),
];


 useEffect(() => {
  void dispatch(fetchUserInfo());
}, [dispatch]);

const user = useAppSelector((store) => store.userSlice.user);

  return (
    <>
    {!user.role? (<Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['1']}
      mode="horizontal"
      theme="dark"
      inlineCollapsed={false}
      items={items}
    />
):(<>
<Avatar
      size={48}
      src={
        user.avatar
          ? `https://wine-server-shevtsova.amvera.io/images/${user.avatar}`
          : "/public/avatar.jpg"
      }
      alt={user.full_name}
      style={{ position: 'absolute', top: '10px', right: '20px' }}
    />
</>)}
    { user.role === 'traveler'?
        (<Menu 
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="horizontal"
        theme="dark"
        inlineCollapsed={false}
        items={itemsTraveler}
      />):(<></>)}
    { user.role === 'organizer'?
        (<Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="horizontal"
        theme="dark"
        inlineCollapsed={false}
        items={itemsOrganize}
      />):(<></>)}      
    { user.role === 'admin'?
        (<Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['1']}
        mode="horizontal"
        theme="dark"
        inlineCollapsed={false}
        items={itemsAdmin}
      />):(<></>)}      
    </>
  );
}
