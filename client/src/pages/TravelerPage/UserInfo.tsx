import { Avatar, Button, Card, Divider, Flex, Space, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/userSlice";
import { useEffect, useState } from "react";
import { fetchUpdateUser, fetchUserFull } from "../../redux/thunkUserActions";

import { CheckOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload, } from "antd";
import type { UploadProps } from "antd";
import { IUpdateInput } from "../../components/ReservUserForm/ReservUserForm";
import { UploadFile } from "antd/lib/upload/interface";

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const initUpdateInputs = {
  full_name: '',
  telephone: '',
  number:1,        
}

const UserInfo = () => {
  const userInfo: IUser = useAppSelector((store) => store.userSlice.userInfo);

  const [loading, setLoading] = useState(false);
  const [AvatarFileImgFormData, uploadFileImgFormData] = useState<UploadFile[]>([]);
  const [AvatarFileImg, uploadAvatarFileImg] = useState<string | undefined>(userInfo.avatar);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [inputs, setInputs] = useState<IUpdateInput>(initUpdateInputs);

// console.log(showForm)

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchUserFull());
  }, [showForm]);

  useEffect(() => {
    setInputs(() => ({ full_name: userInfo.full_name, telephone: userInfo.telephone }));
    form.setFieldsValue(inputs)    
  }, [userInfo]);

  useEffect(() => {
      uploadAvatarFileImg(userInfo.avatar as string);    
  }, [userInfo.avatar]);

   const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const fileList = [...info.fileList]; 
      uploadFileImgFormData(fileList);
      void dispatch(
        fetchUpdateUser({ avatar: info.fileList[0].response.newFileName })
      );
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const [form] = Form.useForm<IUpdateInput>();

  const handleSubmit = async () => {   
    try {
      await form.validateFields();
      void dispatch(fetchUpdateUser(inputs as IUpdateInput));
      setShowForm(false)         
    } catch (error) {
      console.log(error);
    }
  };

  const formStateHandler = () => {
    setInputs(() => form.getFieldsValue());
  };
  
  return (
    <>
      <Card bordered={false}>
        <Flex gap="large" wrap="wrap">
          <div style={{ maxWidth: "600px", overflow: "hidden" }}>
            <img
              src={
                AvatarFileImg ? `http://localhost:3009/images/${AvatarFileImg}` : "avatar.jpg"
              }
              style={{ maxHeight: "400px", width: '100%' }}
            />
          </div>
          <Flex vertical style={{ maxWidth: "600px" }}>
            <Space>
              <Flex gap="middle" wrap="wrap">
                <Upload
                  name="main"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="http://localhost:3009/api/upload_image/main"
                //   beforeUpload={beforeUpload}
                  onChange={handleChange}
                  fileList={AvatarFileImgFormData}
                >
                  {AvatarFileImg ? (
                    <Avatar
                      size={100}
                      src={
                        AvatarFileImg
                          ? `http://localhost:3009/images/${AvatarFileImg}`
                          : "avatar.jpg"
                      }
                      alt={userInfo.full_name}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Flex>
              {/* <Avatar size={128} src={userInfo.avatar || 'avatar.jpg'} alt={userInfo.full_name} /> */}
              <Space
                direction="vertical"
                size="large"
                style={{ marginLeft: "10px" }}
              >
                <Title level={3} style={{ marginBottom: "-15px" }}>
                  {userInfo.full_name}
                </Title>
                <p>{userInfo.email}</p>
              </Space>
            </Space>
            <Divider>Информация</Divider>
            <Title level={5}>
              <Text type="secondary"> Имя:</Text> {userInfo.full_name}
              <br />
              <Text type="secondary"> Email:</Text> {userInfo.email}
              <br />
              <Text type="secondary"> Тел.:</Text> {userInfo?.telephone}
              <br />
              <Text type="secondary"> Статус:</Text>{" "}
              {userInfo?.role === "traveler" ? "Путешественник" : "Организатор"}
            </Title>
            <Space style={{position: 'absolute', bottom: '20px', right: '20px'}}>
            <Button type="link" onClick={() => setShowForm((pre) => !pre)}>
              <EditOutlined style={{fontSize: '18px'}}/>
              </Button>
            </Space>
            {showForm? (
        <Form 
    form={form} 
    onValuesChange={formStateHandler}
    initialValues={ inputs }
    > 
      <Form.Item
        label="Ф.И."
        name="full_name"
        rules={[
          { required: true, message: "Пожалуйста, введите фамилию и имя!" },
        ]}
      >
        <Input type="name" value={inputs.full_name} placeholder="Иванов Иван" />
      </Form.Item>
      <Form.Item 
      label="Телефон" 
      name="telephone" 
      rules={[
        { required: true, message: "Пожалуйста, укажите номер телефона для связи!" },
        { pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/, message: 'Пожалуйста, введите номер не менее 11 цифр' }
        ]}>
        <Input value={inputs.telephone} type="telephone" placeholder="+7**********" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon={<CheckOutlined />} onClick={handleSubmit}>
          Изменить
        </Button>
      </Form.Item>
      </Form>
            ):(<></>)}
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default UserInfo;