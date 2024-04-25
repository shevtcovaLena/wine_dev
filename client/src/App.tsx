import { useState } from "react";
// import './App.css'
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { Navbar } from "./components/Navbar/Navbar";
import ToursPage from "./pages/ToursPage/ToursPage";

import { TourPage } from "./pages/TourPage/TourPage";
import { Col, ConfigProvider, Flex, Layout, Row, theme } from "antd";
import RegLogModal from "./components/RegLogModal/RegLogModal";
import { Logout } from "./pages/LogoutPage/Logout";
import { ReservPage } from "./pages/ReservPage/ReservPage";
import { TourEditPage } from "./pages/TourEditPage/TourEditPage";
import TravelerPage from "./pages/TravelerPage/TravelerPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import OrganizerPage from "./pages/OrganizerPage/OrganizerPage";
import { Lk } from "./components/Navbar/Lk";
import { GithubOutlined } from "@ant-design/icons";
import ProtectedRoute from "./router/ProtectedRoute";
import { useAppSelector } from "./redux/hooks";
import { IUser } from "./redux/userSlice";
import ruRU from 'antd/locale/ru_RU';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('ru', {
  weekStart: 1,
});

const { Header, Footer, Sider, Content } = Layout;

function App() {
  const user: IUser = useAppSelector((store) => store.userSlice.userInfo);

  return (
    <>
      <ConfigProvider locale={ruRU}
        theme={{
          // algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: "#ac3a6d",
            
            // Тема с цветом из презы + светлые карточки:
            colorBgBase: "#EBDAA8",
            colorBgElevated: "#fcf3d7",
            colorBgContainer: "#FCF3D8",
          },
          components: {
            Carousel: {
              algorithm: true,
            },
            Button: {
              algorithm: true,
            },
          },
        }}
        // componentSize = "large"
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <Navbar />
          </Header>
          <Content
            style={{
              padding: "0 48px",
              // backgroundColor: '#ebdaa8'
            }}
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/tours" element={<ToursPage />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/tour/:id" element={<TourPage />} />
              <Route path="/tour_edit/:id" element={<TourEditPage />} />
              <Route path="/lk" element={<Lk />} />
              {/* <Route element={<ProtectedRoute isAuth={Boolean(user.full_name)} redirectTo="/"  />}> */}
              <Route path="/tour/date/:id" element={<ReservPage />} />
              {/* </Route> */}
              {/* <Route path="/traveler" element={<TravelerPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/pa_organizer" element={<OrganizerPage />} /> */}
            </Routes>
          </Content>
          <Footer
            style={{
              color: "#999999",
              backgroundColor: "#001529",
              display: "flex",
              lineHeight: "2.5em",
              justifyContent: "space-around",
            }}
          >
            <Flex vertical style={{width:"100%"}} align="center">
            <Flex justify="space-around" style={{width:"100%"}}> 
              <div>
                <h3>Винные туры</h3>
                {/* <Flex gap={24} style={{width:250}} wrap="wrap"> */}
                <Row gutter={[16, 16]}>
                  <Col>
                    <h4>Крым</h4>
                    <h4>Ставрополье</h4>
                  </Col>
                  <Col>
                    <h4>Кавказ</h4>
                    <h4>Краснодарский край</h4>
                  </Col>
                </Row>
                {/* </Flex> */}
              </div>
              <div>
                <h3>
                  <img
                    src="../public/grape_11854636.png"
                    alt="grape"
                    style={{ width: "20px", height: "20px" }}
                  />
                  Создатели сайта
                </h3>
                <div>
                  <GithubOutlined />
                  <a href="https://github.com/OlgaAZE">
                    {" "}
                    Землянская Ольга{" "}
                  </a>{" "}
                  <GithubOutlined />
                  <a href="https://github.com/VitalyaSamohvalov">
                    {" "}
                    Самохвалов Виталий
                  </a>
                </div>
                <div>
                  <GithubOutlined />
                  <a href="https://github.com/shevtcovaLena">
                    {" "}
                    Шевцова Елена{" "}
                  </a>{" "}
                  <GithubOutlined />
                  <a href="https://github.com/EvstratovNikita">
                    {" "}
                    Евстратов Никита
                  </a>
                </div>
              </div>
              <div>
                <h3>Наши контакты</h3>
                <h4>dreamwineteam@rus-wine.ru</h4>
                <h4>
                  115419, г. Москва, муниципальный округ Донской вн.тер.г., ул.
                  Орджоникидзе, д. 11
                </h4>
                {/* <img src="../public/grape_11854636.png" alt="grape" style={{width: '20px', height:'20px'}} /> */}
              </div>
            </Flex>
            <h4>Copyright 2024 © Все права очень защищены.</h4>
            </Flex>
          </Footer>
          <RegLogModal />
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
