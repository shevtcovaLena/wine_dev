import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  // DatePicker,
  Form,
  Input,
  Upload,
  Row,
  Col,
  Typography 
} from "antd";
import TourEditPageTableDate from "./TourEditPageTableDate";
import axios from "axios";
import YandexMapEdit, { CoordType } from "../../components/YandexMap/YandexMapEdit";
import { useNavigate, useParams } from "react-router-dom";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { tourDateType } from "../ReservPage/ReservPage";
import { UploadFileStatus } from "antd/es/upload/interface";
const { Title } = Typography;

// const { RangePicker } = DatePicker;
const { TextArea } = Input;

// const boxStyle: React.CSSProperties = {
//   width: "100%",
//   height: "100%",
//   borderRadius: 6,
// };

const normFile = (e: UploadChangeParam) => {
  console.log(e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function formatToDate(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate()); // Добавляем дни

  // Форматируем дату обратно в строку
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export interface IRegInput {
  title: string;
  region: string;
  length_days: number;
  description: string;
  price: number;
  path_img: string;
}

const initTbDate = {
  arrDate: [],
};

export interface ITbDate {
  arrDate: Array<object>;
}

export function TourEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initRegInputs = {
    title: "",
    region: "",
    length_days: 0,
    description: "",
    price: 0,
    path_img: "",
  };


  const [form] = Form.useForm();
  const [inputs, setInputs] = useState<IRegInput>(initRegInputs);
  const [tbDate, setTbDate] = useState<ITbDate>(initTbDate);
  const [valueNumberDay, setNumberDay] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<CoordType>([0, 0]);
  const [tbDateTemp, setTbDateTemp] = useState<ITbDate>(initTbDate);

  const formStateHandler = () => {
    setInputs(() => form.getFieldsValue());
  };

  const [MainFileImgFormData, uploadFileImgFormData] = useState<UploadFile[]>([]);
  const [MainFileImg, uploadMainFileImg] = useState("");
  const handleFileChange = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "done") {
      uploadMainFileImg(() => info.fileList[0].response.newFileNmae);
    } else if (info.file.status === "error") {
      console.log(`${info.file.name} файл не был загружен.`);
    }
  };

  const handleFileRemove = (file: UploadFile) => {
    console.log(file);
    return axios
      .post("https://wine-server-shevtsova.amvera.io/api/upload_image/del_main", {
        fileName: MainFileImg,
      })
      .then((response) => {
        uploadFileImgFormData([]);
        console.log("Файл успешно удалён", response);
        return true;
      })
      .catch((error) => {
        uploadFileImgFormData([]);
        console.log("Ошибка при удалении файла", error);
        return false;
      });
  };

  const handleSubmit = async () => {
    const postDataHTTP = {
      valueNumberDay,
      inputs,
      tbDate,
      coordinates,
      MainFileImg,
    };

    const respons = await axios.post(
      `https://wine-server-shevtsova.amvera.io/api/tour_edit?tour_id=${id}`,
      postDataHTTP,
      { withCredentials: true }
    );
    if (respons.status === 200) {
      console.log("Записан!");
      navigate("/lk");
    } else {
      console.log("Ошибка записи в базу данных")
    }
  };

  useEffect(() => {
    if (id !== "-1") {
      axios
        .get(`https://wine-server-shevtsova.amvera.io/api/tour_edit/tour_data?tour_id=${id}`)
        .then((response) => {
          const {
            title,
            region,
            length_days,
            description,
            price,
            path_img,
            Tour_dates,
          } = response.data;
          form.setFieldsValue({
            title,
            region,
            description,
            price,
          });
          setInputs(() => form.getFieldsValue());

          const arrDateTemp = Tour_dates.map((td: tourDateType) => {
            return {
              key: td.id,
              dateStart: formatToDate(td.date),
              dateEnd: formatToDate(td.date_end),
              quantity_seats: td.quantity_seats,
              date_id: td.id,
              isDeletable: false,
            };
          });
          setTbDateTemp(() => ({ arrDate: arrDateTemp }));
          setCoordinates([response.data.location_y, response.data.location_x]);
          setNumberDay(length_days);

          if (path_img) {
            const fileList = [
              {
                uid: "-1",
                name: path_img,
                status: "done" as UploadFileStatus,
                url: `https://wine-server-shevtsova.amvera.io/images/${path_img}`,
              },
            ];
            uploadMainFileImg(path_img);
            uploadFileImgFormData(fileList);
          }
        })
        .catch((error) => {
          console.log("Ошибка при загрузке данных тура:", error);
        });
    }
  }, [id]);

  return (
    <>
      <Card title="Форма работы с туром" bordered={false}>
        <Row gutter={0}>
          <Col span={12}>
            <Form
              form={form}
              onValuesChange={formStateHandler}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ width: "1000px" }}
            >
              <Form.Item label="Заголовок" name="title" >
                <Input value={inputs.title}/>
              </Form.Item>
              <Form.Item label="Регион" name="region" >
                <Input value={inputs.region}/>
              </Form.Item>
              <Form.Item
                label="Описание"
                name="description"                
              >
                <TextArea rows={4} value={inputs.description}/>
              </Form.Item>
              <Form.Item label="Цена" name="price">
                <Input prefix="₽" suffix="RUB" value={inputs.price}/>
              </Form.Item>
              <Form.Item label="Даты туров">
                <TourEditPageTableDate
                  // tbDate={tbDate}
                  tbDateTemp={tbDateTemp}
                  setTbDate={setTbDate}
                  valueNumberDay={valueNumberDay}
                  setNumberDay={setNumberDay}
                />
              </Form.Item>
              <Form.Item
                label="Изображение"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  maxCount={1}
                  name="main"
                  action="https://wine-server-shevtsova.amvera.io/api/upload_image/main"
                  listType="picture"
                  onChange={handleFileChange}
                  onRemove={handleFileRemove}
                  fileList={MainFileImgFormData}
                >
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                  </button>
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" onClick={() => handleSubmit()}>
                  Сохранить
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Title level={4}>Ваши координаты</Title>
            <YandexMapEdit
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
