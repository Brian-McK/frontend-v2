import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import {
  addNewSkill,
  AddNewSkillRequestType,
  ISkill,
} from "../../services/skillsservice";
import { useAuth } from "../../context/AuthContext";

type ErrorWithResponseDataMessage = {
  response: {
    data: {
      message: string;
    };
  };
};

export const AddSkillForm: React.FC = () => {
  const [form] = Form.useForm();

  const auth = useAuth();

  const onFinish = async (values: AddNewSkillRequestType) => {
    const today = new Date();

    try {
      const newSkill: AddNewSkillRequestType = {
        name: values.name,
        description: values.description
      };

      console.log(newSkill);

      const response: ISkill = await addNewSkill(newSkill);

      // FIX THE DATE

      console.log(response);

      // return 201 created, need to change the type, also add loading state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      name="add_skill"
      className="add-skill-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input name" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="name"
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Please input description" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="description"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="add-skill-form-button"
        >
          Add skill
        </Button>
      </Form.Item>
    </Form>
  );
};
