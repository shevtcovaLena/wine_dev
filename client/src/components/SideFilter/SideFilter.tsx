import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Form, InputNumber, Slider, Select, Button, Carousel, Radio } from 'antd';
const { Option } = Select;
import { filterTours } from '../../redux/ToursPage/toursSlice';
import style from './SideFilter.module.css'
import { useDispatch } from 'react-redux';
import { FormItemInputContext } from 'antd/es/form/context';

const contentStyle: React.CSSProperties = {
  // margin: 0,
  height: '410px',
  width: '320px',
  // color: '#fff',
  // lineHeight: '160px',
  // textAlign: 'center',
  
};


const CustomForm = ({tours}): JSX.Element => {

  const toursDefault = useAppSelector(store => store.toursSlice.toursDefault)
  // const toursState = toursDefault;
  const [form] = Form.useForm();
  
  const dispatch = useDispatch();
  const onFinish = (values) => {
    dispatch(filterTours({ values, toursDefault }))
    console.log('Received values of form: ', values);
  };
  
  const [ stateTours, setTours] = useState(tours);
  const [ region, setRegion ] = useState([]);
  const [dotPosition, setDotPosition] = useState('top');
  const handlePositionChange = ({ target: { value } }) => {
    setDotPosition(value);
  };
  const regionFilter = tours.map(tour => tour.region)
  const sideRegion = Array.from(new Set(regionFilter))
  
  useEffect(()=>{
    setRegion(sideRegion)
  },[tours])
  
  const resetFilter = () => {
    form.resetFields();
    setTours(tours);  
  };
  
  const onChange = (currentSlide: number) => {
    console.log(currentSlide)
  }
  return (
    <div className={style.sideContainer}>
       <Radio.Group
        onChange={handlePositionChange}
        value={dotPosition}
        style={{
          marginBottom: 8,
        }}
      >
      </Radio.Group>
    <Form
      name="custom-form"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{ slider: 30, selector: 'option1' }}
      // onValuesChange={filterTourHandler} // Listen for changes
      form={form}
    >
        <Form.Item label="Регион" name="region">
          <Select
           placeholder="Выберите регион" 
           allowClear>
           {region.map((el)=> <Option value={el} key={el}>{el}</Option>)} 
          </Select>
        </Form.Item>

      <Form.Item
        name="priceRangeMin"
        label="Цена"
      >
        <>
        <InputNumber min={4000} placeholder="От 4000" style={{width:'320px'}} />
        </>
        </Form.Item>

        <Form.Item
        name="priceRangeMax"
        
        >
        <>
        <InputNumber max={90000} placeholder="До 90000" style={{width:'320px'}}/> 
        </>
        </Form.Item>
      <Form.Item
        name="duration"
        label="Длительность"
        // rules={[{ required: true, message: 'Выберите количество дней' }]}
      >
        <Slider range min={0} max={10} />
      </Form.Item>
      <Form.Item>
      <Button type="primary" htmlType="submit" style={{margin:
      '10px'
      }}>
          Выбрать
        </Button>
        <Button type="primary" htmlType="submit" style={{margin:
      '10px'
      }} onClick={resetFilter}>
          Сбросить
        </Button>
      </Form.Item>
    </Form>

    <Carousel dotPosition={dotPosition} afterChange={onChange} autoplay={true}>
      <div>
        <div style={contentStyle}className="elfsight-app-8e70fbb4-b2a8-4e1a-b8f4-71cd1479d601" data-elfsight-app-lazy></div>
      </div>
      
      <div>
      <div style={contentStyle}className="elfsight-app-65dbeb4d-d111-4d6f-b9bc-8fd1dbb7a038" data-elfsight-app-lazy></div>
      </div>

      <div>
      <div style={contentStyle}className="elfsight-app-08f72a67-0edc-4b2f-92ec-ad4e02edbf88" data-elfsight-app-lazy></div>
      </div>
      <div>

      <div style={contentStyle}className="elfsight-app-3ae4146a-d3e2-4768-b5d2-04c453a05e4c" data-elfsight-app-lazy></div>
      </div>
      
    </Carousel>
       
  
    </div>
  );
};

export default CustomForm;