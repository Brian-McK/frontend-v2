import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import {
  loginUser,
  IAuthenticationResponse,
  IAuthenticationRequest,
} from "../../services/authservice";
import { useAuth } from "../../context/AuthContext";

type ErrorWithResponseDataMessage = {
  response: {
    data: {
      message: string;
    };
  };
};

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm();

  const auth = useAuth();

  const onFinish = async (values: IAuthenticationRequest) => {
    try {
      const credentials: IAuthenticationRequest = {
        username: values.username,
        password: values.password,
      };

      const response: IAuthenticationResponse = await loginUser(credentials);

      if (response.authenticated) {
        auth.setLoggedIn(
          response.authenticated.username,
          response.authenticated.jwtToken
        );
      }
    } catch (error) {
      auth.setLoggedOut();

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
