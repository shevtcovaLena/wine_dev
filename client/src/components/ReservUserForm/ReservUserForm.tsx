import React, { useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, InputNumber } from "antd";
import { CheckOutlined } from "@ant-design/icons";

export interface IUpdateInput {
     full_name?:string,
     telephone?:string,
     number?:number,
     avatar?:string,           
 }

export default function ReservUserForm( { 
    maxSeets,
    form, 
    handleSubmit,
    formStateHandler,
    inputs,
  } : {
    maxSeets : number,
    form: FormInstance,
    handleSubmit: () => void,
    formStateHandler: () => void,
    inputs: IUpdateInput,
  } ) {

  return (
    <Form 
    form={form} 
    onValuesChange={formStateHandler}
    initialValues={ inputs }
    > 
      <Form.Item
        label="Ф.И."
        name="full_name"
        type="name"
        value={inputs.full_name}
        rules={[
          { required: true, message: "Пожалуйста, введите фамилию и имя!" },
        ]}
      >
        <Input placeholder="Иванов Иван" />
      </Form.Item>
      <Form.Item 
      label="Телефон" 
      name="telephone" 
      value={inputs.telephone} 
      rules={[
        { required: true, message: "Пожалуйста, укажите номер телефона для связи!" },
        { pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, message: 'Пожалуйста, введите номер не менее 11 цифр' }
        ]}>
        <Input type="telephone" placeholder="+7**********" />
      </Form.Item>
      <Form.Item name="number" label="Количество человек" value={inputs.number}>
        <InputNumber min={1} max={maxSeets} defaultValue={1}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" size="large" icon={<CheckOutlined />} onClick={handleSubmit}>
          Забронировать
        </Button>
      </Form.Item>
    </Form>
  );
}
