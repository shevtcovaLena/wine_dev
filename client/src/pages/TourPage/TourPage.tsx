import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TourPage.module.css";
import FormBooking from "../../components/FormBooking/FormBooking";
import YandexMapTour from "../../components/YandexMap/YandexMapTour";
import Disqus from "../../components/Disqus/Disqus";
import { Card, Rate, Button, Drawer, Space, message } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Chat from "../../components/Chat/Chat";
import { useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/userSlice";

export type TourPageType = {
  id: number;
  title: string;
  description: string;
  owner_id: number;
  region: string;
  price: number;
  location_x: string;
  location_y: string;
  status: string;
  length_days: number;
  path_img: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TourDateType = {
  id: number;
  tour_id: number;
  date: Date;
  date_end: string;
  quantity_seats: number;
  createdAt: Date;
  updatedAt: Date;
};

export type RetingAverageType = { tour_id: number, average: number }

export function TourPage() {
  const { id } = useParams();
  const [tourPage, setTourPage] = useState<TourPageType | null>(null);
  const [tourDates, setTourDates] = useState<TourDateType[]>([]);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const user: IUser = useAppSelector((store) => store.userSlice.user);

  

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<TourPageType>(`http://localhost:3009/api/tour?tour_id=${id}`)
      .then((response) => setTourPage(response.data))
      .catch((error) => console.log(error));
    navigate({ hash: "#disqus_thread" });
  }, [navigate]);

  const [tourRatings, setTourRatings] = useState<RetingAverageType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3009/api/ratings/average")
      .then((response) => {
        setTourRatings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tour ratings:", error);
      });
  }, []);

  const getAverageRating = (tourId: number) => {
    const ratingsArray = Object.values(tourRatings); // Преобразование объекта в массив значений
    const rating = ratingsArray.find((el) => el.tour_id === tourId);
    const average = rating ? parseFloat(String(rating.average)) : 0; // Преобразование среднего рейтинга в число
    return average.toFixed(1); // Вызов метода toFixed() на числовом значении
  };

  async function fetchTourDates(tour_id: number): Promise<string[]> {
    try {
      const response = await axios.get<string[]>(
        `http://localhost:3009/api/date/tour/${tour_id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tour dates:", error);
      return [];
    }
  }

  useEffect(() => {
    if (id) {
      const idAsNumber = parseInt(id);
      fetchTourDates(idAsNumber).then((dates) => {
        setTourDates(dates);
        const seats = dates.map((date) => date.quantity_seats);
      });
    }
  }, [id]);

  const showDrawer = () => {
    if (user.full_name === "") {
      messageApi.open({
        type: 'error',
        content: 'Необходимо войти или зарегистрироваться.',
      });
    } else {
      setOpen(true);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  console.log(tourDates, "TOUR DATES");

  const discountedPrice: number = tourPage ? tourPage.price * 1.25 : 0;
  const pricePerDay: number = tourPage
    ? tourPage.price / tourPage.length_days
    : 0;

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
    <>
      {contextHolder}
      {tourPage ? (
        <div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "50px",
              marginTop: "50px",
            }}
          >
            <Title level={1}>{tourPage.title}</Title>
            <span style={{ marginLeft: "10px" }}></span>
            <p>
              <Rate
                allowHalf
                value={parseFloat(getAverageRating(tourPage.id))}
                disabled
                style={{ color: "#AC3A6D" }}
              />{" "}
              {getAverageRating(tourPage.id)}
            </p>
          </span>
          <img
            src={`/public/images/${tourPage.path_img}`}
            alt={tourPage.title}
            className={styles.image}
          />
          <div className={styles.container}>
            <div className={styles.leftContainer}>
              <Card>
                <div>
                  <Title level={2} className={styles.aboutTour}>
                    {" "}
                    О туре:
                  </Title>
                </div>
                <br />
                <Paragraph className={styles.description}>
                  {tourPage.description}
                </Paragraph>
                <Button type="link" onClick={showDrawer}>
                  Связаться с организатором
                </Button>
              </Card>
            </div>
            <div
              className={styles.rightContainer}
              style={{
                background: "#f0f0f0",
                padding: "20px",
                border: "2px solid #d9d9d9",
                borderRadius: "10px",
                maxWidth: "600px",
                alignContent: "center",
              }}
            >
              <Paragraph style={{ marginBottom: 20, marginTop: 0 }}>
                <Title
                  level={3}
                  style={{
                    display: "inline-block",
                    textDecoration: "line-through",
                    color: "gray",
                  }}
                >
                  {Math.ceil(discountedPrice)}
                </Title>
                <Title
                  level={3}
                  style={{ display: "inline-block", marginLeft: 20 }}
                >
                  {" "}
                  ₽ {Math.ceil(tourPage.price)}
                </Title>
              </Paragraph>
              <Title level={5}>
                ₽ {Math.ceil(pricePerDay)} /день |{" "}
                {formatDaysString(tourPage.length_days)}{" "}
              </Title>
              <div style={{ marginTop: 30 }}>
                <FormBooking
                  tourDates={tourDates}
                  messageApi={messageApi}
                />
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: 30, display: "flex", justifyContent: "center" }}
          >
            <YandexMapTour
              tourId={tourPage.id}
              tourTitle={tourPage.title}
              locationX={tourPage.location_y}
              locationY={tourPage.location_x}
            />
          </div>
          <Disqus url={""} identifier={""} />
          <Drawer
            title="Чат"
            placement={"left"}
            size={"large"}
            width={"50%"}
            onClose={onClose}
            open={open}
            extra={
              <Space>
                <Button onClick={onClose}>Закрыть</Button>
              </Space>
            }
          >
            <div style={{ margin: "20px 0" }}>
              <Chat tourId={tourPage.owner_id} />
            </div>
          </Drawer>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
