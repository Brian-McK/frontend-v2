import React from "react";
import { Button, Form, Input } from "antd";
import {
  addNewSkill,
  updateSkill, // Import the updateSkill function
  AddNewSkillRequestType,
} from "../../services/skillsservice";
import { IMutationResolved } from "../../Interfaces/MutationInterface";
import { ISkill } from "../../services/skillsservice";

const { TextArea } = Input;

type SkillFormProps = {
  initialSkill?: ISkill;
} & IMutationResolved;

export const SkillForm: React.FC<SkillFormProps> = ({
  onMutationResolved,
  initialSkill,
}: SkillFormProps) => {
  const [form] = Form.useForm();

  const onFinish = async (values: AddNewSkillRequestType) => {
    try {
      if (initialSkill) {
        const updatedSkill: AddNewSkillRequestType = {
          name: values.name,
          description: values.description,
        };

        const updateSkillResponse = await updateSkill(
          initialSkill._id,
          updatedSkill
        );

        if (updateSkillResponse.status === 200) {
          if (onMutationResolved) {
            onMutationResolved(true);
          }
        }
      } else {
        const newSkill: AddNewSkillRequestType = {
          name: values.name,
          description: values.description,
        };

        const addSkillResponse = await addNewSkill(newSkill);

        if (addSkillResponse.status === 201) {
          form.resetFields();
          if (onMutationResolved) {
            onMutationResolved(true);
          }
        }
      }
    } catch (error) {
      if (onMutationResolved) {
        onMutationResolved(false);
      }
      console.error(error); // TODO- ERROR STATE
    }
  };

  return (
    <Form
      form={form}
      layout={"vertical"}
      name={initialSkill ? "edit_skill" : "add_skill"}
      className="skill-form"
      initialValues={initialSkill || { remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Skill name"
        name="name"
        rules={[{ required: true, message: "Please input skill name" }]}
      >
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input skill description" }]}
      >
        <TextArea rows={3} placeholder="description" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="skill-form-button">
          {initialSkill ? "Update Skill" : "Add Skill"}
        </Button>
      </Form.Item>
    </Form>
  );
};
