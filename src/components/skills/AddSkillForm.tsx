import React from "react";
import { Button, Form, Input } from "antd";
import {
  addNewSkill,
  AddNewSkillRequestType,
} from "../../services/skillsservice";
import { useAuth } from "../../context/AuthContext";
import { IMutationResolved } from "../../Interfaces/MutationInterface";

type ErrorWithResponseDataMessage = {
  response: {
    data: {
      message: string;
    };
  };
};

const { TextArea } = Input;

type AddSkillFormProps = {} & IMutationResolved;

export const AddSkillForm: React.FC<AddSkillFormProps> = ({
  onMutationResolved,
}: AddSkillFormProps) => {
  const [form] = Form.useForm();

  const auth = useAuth();

  const onFinish = async (values: AddNewSkillRequestType) => {
    try {
      const newSkill: AddNewSkillRequestType = {
        name: values.name,
        description: values.description,
      };

      const addSkillResponse = await addNewSkill(newSkill);

      if (addSkillResponse.status === 201) {
        form.resetFields();
        // trigger for refetching skills
        onMutationResolved(true);
      }
    } catch (error) {
      onMutationResolved(false);
      console.error(error); // TODO- ERROR STATE
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
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Please input description" }]}
      >
        <TextArea rows={3} placeholder="description" />
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
