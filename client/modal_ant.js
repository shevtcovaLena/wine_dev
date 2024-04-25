// Установите Ant Design в ваш проект, если вы ещё этого не сделали. Используйте команду npm или yarn для установки:

// bash
// Copy code
// npm install antd
// или

// bash
// Copy code
// yarn add antd
// Импортируйте необходимые компоненты из Ant Design. Вам понадобятся, как минимум, Modal, Form, Input, и Button для создания форм регистрации и авторизации.
// Создайте состояния для управления видимостью модальных окон и для хранения данных форм.
// Реализуйте формы регистрации и авторизации внутри модальных окон, используя компоненты Form и Input от Ant Design.
// Обработайте события отправки форм, чтобы выполнить регистрацию или авторизацию пользователя.
// Вот примерный код для модального окна регистрации на React с использованием Ant Design:

// jsx
// Copy code
import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const RegistrationModal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
    // Здесь должна быть логика регистрации пользователя
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Регистрация
      </Button>
      <Modal
        title="Регистрация"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="registration"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RegistrationModal;
// Этот код создаст кнопку, при нажатии на которую открывается модальное окно с формой регистрации. Форма принимает email и пароль, а затем выводит введённые данные в консоль при отправке. В реальном приложении вам нужно будет заменить вывод в консоль на функцию регистрации пользователя.

// Для авторизации процесс будет аналогичным, только форма будет содержать другие поля (например, только email и пароль) и другую логику обработки отправки формы.