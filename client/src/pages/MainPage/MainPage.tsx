// import React from "react";
import { Carousel, Flex, Image } from "antd";
import YandexMapMain from "../../components/YandexMap/YandexMapMain";
import Title from "antd/es/typography/Title";

export function MainPage() {
  const contentStyle = {
    height: "40vh",
    width: "100%",
    overflow: "hidden",
  };

  return (
    <>
      <div
        className="elfsight-app-9fc07b51-1740-45ef-a506-3fe598d50a2d"
        data-elfsight-app-lazy
      ></div>
      <div
        style={{ margin: "0 -48px", position: "relative", overflow: "hidden" }}
      >
        <Title
          level={1}
          style={{
            filter: "drop-shadow(3px 3px 4px #253224)",
            position: "absolute",
            color: "white",
            left: 30,
            top: "5vh",
            zIndex: 1000,
            fontWeight: "400",
            fontSize: "4rem",
            maxWidth: "50%",
          }}
        >
          Винные туры по винодельням России - проведи майские праздники со
          вкусом!
        </Title>
        <img
          src="Logo.png"
          style={{
            filter: "drop-shadow(3px 3px 6px #253224)",
            position: "absolute",
            right: 30,
            top: "25vh",
            zIndex: 1000,
            height: "32vh",
          }}
        />
        <Carousel
          autoplay
          style={{
            height: "60vh",
            overflow: "hidden",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            filter: "",
          }}
        >
          <div style={contentStyle}>
            <Image
              preview={false}
              style={{ width: "100vw" }}
              src="mainFont4.jpg"
            />
          </div>

          <div style={contentStyle}>
            <Image
              preview={false}
              style={{ width: "100vw" }}
              src="mainFont.jpg"
            />
          </div>
          <div style={contentStyle}>
            <Image
              preview={false}
              style={{ width: "100vw" }}
              src="mainFont2.jpg"
            />
          </div>
          <div style={contentStyle}>
            <Image
              preview={false}
              style={{ width: "100vw" }}
              src="mainFont3.jpg"
            />
          </div>
        </Carousel>
        <Flex vertical align="center" gap="large">
          <Title
            level={2}
            style={{
              textAlign: "center",
              padding: "0 10vw",
              fontWeight: "400",
            }}
          >
            <br />
            Мы поможем подобрать вам туры от лучших виноделен страны от крупных
            до небольших семейных производств! Если вы являетесь представителем
            винного производства, вы можете подать заявку на добавление тура,
            зарегистрировавшись в качестве организатора.{" "}
          </Title>
          <Title
            level={2}
            style={{
              textAlign: "center",
              padding: "0 10vw",
              fontWeight: "400",
            }}
          >
            Начните обзор нашего сайта с карты виноделен России.
          </Title>
          <div
            style={{
              marginBottom: "30px",
              height: 5,
              backgroundColor: "#a18f63",
              borderRadius: "10px",
              width: "30%",
            }}
          ></div>
        </Flex>

        <YandexMapMain />
      </div>
    </>
  );
}
