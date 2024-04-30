import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  Form,
  InputNumber,
  Slider,
  Select,
  Button,
  Carousel,
} from "antd";
const { Option } = Select;
import { filterTours } from "../../redux/ToursPage/toursSlice";
import style from "./SideFilter.module.css";
import { useDispatch } from "react-redux";
import { InputProps } from "antd/lib/input";

const contentStyle: React.CSSProperties = {
  height: "410px",
  width: "320px",
};

const SideFilter = () => {
  const tours = useAppSelector((store) => store.toursSlice.tours);
  const toursDefault = useAppSelector((store) => store.toursSlice.toursDefault);

  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const onFinish = (values: InputProps) => {
    dispatch(filterTours({ values, toursDefault }));
    console.log("Received values of form: ", values);
  };

  const [region, setRegion] = useState<string[]>([]);

  const regionFilter = toursDefault.map((tour) => tour.region);
  const sideRegion: string[] = Array.from(new Set(regionFilter));

  useEffect(() => {
    setRegion(sideRegion);
  }, [tours]);

  const resetFilter = () => {
    form.resetFields();
  };

  return (
    <div className={style.sideContainer}>
      <Form
        name="custom-form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ slider: 30, selector: "option1" }}
        form={form}
      >
        <Form.Item label="Регион" name="region">
          <Select placeholder="Выберите регион" allowClear>
            {region.map((el) => (
              <Option value={el} key={el}>
                {el}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="priceRangeMin" label="Цена">
          <>
            <InputNumber
              min={4000}
              placeholder="От 4000"
              style={{ width: "320px" }}
            />
          </>
        </Form.Item>

        <Form.Item name="priceRangeMax">
          <>
            <InputNumber
              max={90000}
              placeholder="До 90000"
              style={{ width: "320px" }}
            />
          </>
        </Form.Item>
        <Form.Item
          name="duration"
          label="Длительность"
        >
          <Slider range min={0} max={10} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ margin: "10px" }}>
            Выбрать
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ margin: "10px" }}
            onClick={resetFilter}
          >
            Сбросить
          </Button>
        </Form.Item>
      </Form>

      <Carousel dotPosition={"top"} autoplay={true}>
        <div>
          <div
            style={contentStyle}
            className="elfsight-app-8e70fbb4-b2a8-4e1a-b8f4-71cd1479d601"
            data-elfsight-app-lazy
          ></div>
        </div>

        <div>
          <div
            style={contentStyle}
            className="elfsight-app-65dbeb4d-d111-4d6f-b9bc-8fd1dbb7a038"
            data-elfsight-app-lazy
          ></div>
        </div>

        <div>
          <div
            style={contentStyle}
            className="elfsight-app-08f72a67-0edc-4b2f-92ec-ad4e02edbf88"
            data-elfsight-app-lazy
          ></div>
        </div>
        <div>
          <div
            style={contentStyle}
            className="elfsight-app-3ae4146a-d3e2-4768-b5d2-04c453a05e4c"
            data-elfsight-app-lazy
          ></div>
        </div>
      </Carousel>
    </div>
  );
};

export default SideFilter;
