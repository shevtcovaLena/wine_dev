import React, { useState } from "react";
import { Form, Modal, Radio } from "antd";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { show, hide } from "../../redux/userSlice";

export default function RegLogModal() {
  const open = useAppSelector(
    (store: { userSlice: { open: boolean } }) => store.userSlice.open
  );
  const dispatch = useAppDispatch();
  const msg = useAppSelector((store) => store.userSlice.msg);

  const showModal = () => {
    dispatch(show());
  };


  const handleCancel = () => {
    console.log("Clicked cancel button");
    dispatch(hide());
  };

  const [formType, setForm] = useState<string>("reg");

  const onFormChange = ({ reglog }: { reglog: string }) => {
    setForm(reglog);
  };

  return (
    <>
      <Modal
        open={open}
        // onOk={handleOk}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={<p style={{ color: "red" }}>{msg}</p>}
      >
        <Form
          reglog={formType}
          initialValues={{ reglog: formType }}
          onValuesChange={onFormChange}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="reglog">
            <Radio.Group value={formType}>
              <Radio.Button value="reg">Регистрация</Radio.Button>
              <Radio.Button value="log">Вход</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        {/* <Form> */}
          {formType === "reg" ? (
            <Registration handleCancel={handleCancel} />
          ) : (
            <Login handleCancel={handleCancel} />
          )}
        {/* </Form> */}
      </Modal>
    </>
  );
}
