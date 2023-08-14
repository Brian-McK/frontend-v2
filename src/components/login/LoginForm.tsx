import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import {
  loginUser,
  AuthenticationResponse,
  AuthenticationRequest,
} from "../../services/authservice";

type ErrorWithResponseDataMessage = {
  response: {
    data: {
      message: string;
    };
  };
};

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: AuthenticationRequest) => {
    try {
      const credentials: AuthenticationRequest = {
        username: values.username,
        password: values.password,
      };

      console.log(credentials);

      const response: AuthenticationResponse = await loginUser(credentials);
      console.log("User authenticated:", response);
    } catch (error) {
      console.error(
        "Authentication failed:",
        (error as ErrorWithResponseDataMessage).response.data.message
      );
    }
  };

  return (
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};
