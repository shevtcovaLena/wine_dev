import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage/MainPage";
import { Navbar } from "./components/Navbar/Navbar";
import ToursPage from "./pages/ToursPage/ToursPage";

import { TourPage } from "./pages/TourPage/TourPage";
import { Col, ConfigProvider, Flex, Layout, Row, 
  // theme,
 } from "antd";
import RegLogModal from "./components/RegLogModal/RegLogModal";
import { Logout } from "./pages/LogoutPage/Logout";
import { ReservPage } from "./pages/ReservPage/ReservPage";
import { TourEditPage } from "./pages/TourEditPage/TourEditPage";
import { Lk } from "./components/Navbar/Lk";
import { GithubOutlined } from "@ant-design/icons";
import ruRU from 'antd/locale/ru_RU';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.updateLocale('ru', {
  weekStart: 1,
});

const { Header, Footer, Content } = Layout;

function App() {
 

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
              <Route path="/tour/date/:id" element={<ReservPage />} />
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
                  <a href="https://github.com/shevtcovaLena">
                    {" "}
                    Шевцова Елена{" "}
                  </a>{" "}и Компания                  
                </div>
              </div>
              <div>
                <h3>Наши контакты</h3>
                <h4>dreamwineteam@rus-wine.ru</h4>
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
