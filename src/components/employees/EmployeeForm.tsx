import React, { useState } from "react";
import { Button, Checkbox, Form, Input, DatePicker } from "antd";
import {
  addNewSkill,
  updateSkill, // Import the updateSkill function
  AddNewSkillRequestType,
} from "../../services/skillsservice";
import { useAuth } from "../../context/AuthContext";
import { IMutationResolved } from "../../Interfaces/MutationInterface";
import {
  AddNewEmployeeRequestType,
  IEmployee,
  UpdateEmployeeRequestType,
  addNewEmployee,
} from "../../services/employeeservice";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

const { TextArea } = Input;

type EmployeeFormProps = {
  initialEmployee?: IEmployee;
} & IMutationResolved;

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onMutationResolved,
  initialEmployee,
}: EmployeeFormProps) => {
  const [form] = Form.useForm();

  const [active, setIsActive] = useState<boolean>(true);

  const auth = useAuth();

  const onChangeIsActiveHandler = (e: CheckboxChangeEvent) => {
    setIsActive(e.target.checked);
  };

  console.log(active);

  const onFinish = async (values: AddNewEmployeeRequestType) => {
    try {
      if (initialEmployee) {
        const updatedEmployee: UpdateEmployeeRequestType = {
          firstName: values.firstName,
          lastName: values.lastName,
          dob: values.dob,
          email: values.email,
          isActive: active,
          skillLevels: [],
        };

        console.log(updatedEmployee);

        // const updateEmployeeResponse = await updateEmployee(
        //   initialEmployee._id,
        //   updatedEmployee
        // );

        // if (updateEmployeeResponse.status === 200) {
        //   if (onMutationResolved) {
        //     onMutationResolved(true);
        //   }
        // }
      } else {
        const newEmployee: AddNewEmployeeRequestType = {
          firstName: values.firstName,
          lastName: values.lastName,
          dob: dayjs(values.dob).format(dateFormat),
          email: values.email,
          isActive: active,
          skillLevels: [],
        };

        console.log(newEmployee);

        const addEmployeeResponse = await addNewEmployee(newEmployee);

        if (addEmployeeResponse.status === 201) {
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

  const dateFormat = "YYYY-MM-DD";

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
        name="firstName"
        rules={[{ required: true, message: "Please input first name" }]}
      >
        <Input placeholder="First name" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        rules={[{ required: true, message: "Please input last name" }]}
      >
        <Input placeholder="Last name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input email" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Form.Item label="Status" name="isActive">
        <Checkbox defaultChecked={true} onChange={onChangeIsActiveHandler}>
          {active ? "Active" : "Not Active"}
        </Checkbox>
      </Form.Item>

      <Form.Item
        label="Date of birth"
        name="dob"
        rules={[{ required: true, message: "Please input date of birth" }]}
      >
        <DatePicker
          // value={dayjs().subtract(18, "year")}
          format={dateFormat}
        />
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
