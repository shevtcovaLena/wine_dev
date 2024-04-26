import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRegUser } from "../../redux/thunkUserActions";
import { IUser } from "../../redux/userSlice";

export default function Registration({ handleCancel, }: { handleCancel: () => void; }) {

    const initRegInputs = {
        full_name:'',
        email:'',
        telephone:'',
        role: '',
        password: '',        
    }

  interface IRegInput {
        full_name:string,
        email:string,
        telephone:string,
        role: string,
        password: string,        
    }

  const [form] = Form.useForm();

  const [inputs, setInputs] = useState<IRegInput>(initRegInputs);
  
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);

  useEffect(() => {
    if (user.id) {
      form.resetFields();
      handleCancel();
    }  
  }, [user]);

   const handleSubmit = async () => {
    try {
      await form.validateFields();
      void dispatch(fetchRegUser(inputs as IUser));        
    } catch (error) {
      console.log(error);
    }
  };
  
  const formStateHandler = () => {
    setInputs(() => form.getFieldsValue());
  };

  return (
    <Form form={form} onValuesChange={formStateHandler}> 
      <Form.Item
        label="Ф.И."
        name="full_name"
        // type="name"
        rules={[
          { required: true, message: "Пожалуйста, введите фамилию и имя!" },
        ]}
      >
        <Input  value={inputs.full_name} placeholder="Иванов Иван" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Пожалуйста, введите email!" },
        { pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, message: 'Пожалуйста, введите корректный адрес' }
        ]}
      >
        <Input value={inputs.email} type="email" placeholder="Введите email..." />
      </Form.Item>
      <Form.Item 
      label="Телефон" 
      name="telephone" 
      rules={[{ pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, message: 'Пожалуйста, введите корректный номер' }
        ]}>
        <Input value={inputs.telephone}  type="telephone" placeholder="+7**********" />
      </Form.Item>
      <Form.Item
        label="Выбор"
        name="role"        
        rules={[{ required: true, message: "Пожалуйста, укажите кто вы!" }, 
        ]}
      >
        <Select value={inputs.role}>
          <Select.Option value="traveler">Путешественник</Select.Option>
          <Select.Option value="organizer">Организатор</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Please input your password!" },          
        { min: 7, message: 'Пароль должен содержать не менее 7 символов' },
        { pattern: /^(?=.*[a-z])(?=.*\d).+$/, message: 'Пароль должен содержать цифры и буквы латинского алфавита' }
        ]}
      >
        <Input value={inputs.password} type="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={() => handleSubmit()}>
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
}
