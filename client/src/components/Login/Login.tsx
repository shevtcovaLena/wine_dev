import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchLogUser, fetchUserInfo } from "../../redux/thunkUserActions";
import { IUser } from "../../redux/userSlice";
// import Password from 'antd/es/input/Password';

export default function Login({ handleCancel }: { handleCancel: () => void }) {
  const initLogInputs = {
    email: "",
    password: "",
  };

  interface ILogInput {
    email: string;
    password: string;
  }

  const [form] = Form.useForm();

  const [inputs, setInputs] = useState<ILogInput>(initLogInputs);

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
      void dispatch(fetchLogUser(inputs as IUser));        
    } catch (error) {
      console.log(error);
    }
  };

  const formStateHandler = () => {
    setInputs(() => form.getFieldsValue());
  };

  return (
    <>
      <Form form={form} onValuesChange={formStateHandler} >
        <Form.Item
          label="Email"
          name="email"
          value={inputs.email}
          rules={[{ required: true, message: "Пожалуйста введите email!"}]}
        >
          <Input type="email" placeholder="Введите email..." />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          value={inputs.password}
          rules={[{ required: true, message: "Пожалуйста введите пароль!" }
          ]}
        >
          <Input type="password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={() => handleSubmit()}>
            Отправить
          </Button>
        </Form.Item>
      </Form>      
    </>
  );
}

// export default function Login({ handleCancel }: { handleCancel: () => void }) {

//   const [form] = Form.useForm();
//   const dispatch = useAppDispatch();
//   const handleSubmit = async () => {
//     try {
//       await form.validateFields()
//       void dispatch(fetchLogUser(inputs as IUser));
//       form.resetFields();
//       handleCancel();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Form form={form} onValuesChange={formStateHandler}>
//       <Form.Item
//         label="Email"
//         name="email"
//         value={inputs.email}
//         rules={[{ required: true, message: "Пожалуйста введите email!" }]}
//       >
//         <Input type="email" placeholder="Введите email..." />
//       </Form.Item>
//       <Form.Item
//         label="Пароль"
//         name="password"
//         value={inputs.password}
//         rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
//       >
//         <Input placeholder="Иванов" type="password" />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" onClick={() => handleSubmit()}>
//           Отправить
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }
