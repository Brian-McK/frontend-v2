import React, { useState } from "react";
import { Button, Checkbox, Form, Input, DatePicker } from "antd";
import {
  addNewSkill,
  updateSkill, // Import the updateSkill function
  AddNewSkillRequestType,
} from "../../services/skillsservice";
import { useAuth } from "../../context/AuthContext";
import { IMutationResolved } from "../../Interfaces/MutationInterface";
import { IEmployee } from "../../services/employeeservice";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { DatePickerProps } from "antd";

const { TextArea } = Input;

type EmployeeFormProps = {
  initialEmployee?: IEmployee;
} & IMutationResolved;

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onMutationResolved,
  initialEmployee,
}: EmployeeFormProps) => {
  const [form] = Form.useForm();

  const [active, setIsActive] = useState<boolean>(false);

  const auth = useAuth();

  const onChangeIsActiveHandler = (e: CheckboxChangeEvent) => {
    setIsActive(e.target.checked);
  };

  const onChangeDateHandler: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.log(dateString);
  };

  const onFinish = async (values: AddNewSkillRequestType) => {
    try {
      if (initialEmployee) {
        const updatedSkill: AddNewSkillRequestType = {
          name: values.name,
          description: values.description,
        };

        const updateSkillResponse = await updateSkill(
          initialEmployee._id,
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
      layout="vertical"
      name={initialEmployee ? "edit_employee" : "add_employee"}
      className="employee-form"
      initialValues={initialEmployee || { remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="First name"
        name="first name"
        rules={[{ required: true, message: "Please input first name" }]}
      >
        <Input placeholder="First name" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="Last name"
        rules={[{ required: true, message: "Please input last name" }]}
      >
        <Input placeholder="Last name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="Email"
        rules={[{ required: true, message: "Please input email" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item label="Status" name="Active">
        <Checkbox
          defaultChecked={false}
          checked={active}
          onChange={onChangeIsActiveHandler}
        >
          {active ? "Active" : "Not Active"}
        </Checkbox>
      </Form.Item>

      <Form.Item
        label="Date of birth"
        name="dob"
        rules={[{ required: true, message: "Please input date of birth" }]}
      >
        <DatePicker format={"YYYY-MM-DD"} onChange={onChangeDateHandler} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="employee-form-button"
        >
          {initialEmployee ? "Update employee" : "Add employee"}
        </Button>
      </Form.Item>
    </Form>
  );
};
