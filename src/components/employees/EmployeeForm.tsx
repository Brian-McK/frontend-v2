import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Select,
} from "antd";
import { ISkill, ISkillsArray } from "../../services/skillsservice";
import { IMutationResolved } from "../../Interfaces/MutationInterface";
import {
  AddNewEmployeeRequestType,
  IEmployee,
  UpdateEmployeeRequestType,
  addNewEmployee,
  updateEmployee,
} from "../../services/employeeservice";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import dayjs from "dayjs";
import "dayjs/plugin/customParseFormat";
import type { SelectProps } from "antd";

type EmployeeFormProps = {
  initialEmployee?: any; // TODO - fix later - dob field not in IEmployee
  skillsToSelect: ISkillsArray | null; // change null here later
} & IMutationResolved;

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onMutationResolved,
  initialEmployee,
  skillsToSelect,
}: EmployeeFormProps) => {
  const [form] = Form.useForm();
  const [active, setIsActive] = useState<boolean>(true);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  let options: SelectProps["options"] = [];

  options = skillsToSelect?.map((skill: ISkill) => ({
    label: skill.name,
    value: skill._id,
  }));

  const dateFormat = "YYYY-MM-DD";

  console.log(initialEmployee);

  const handleSelectSkillChange = (value: string[]) => {
    setSelectedSkills(value);
    console.log(`selected ${value}`);
  };

  const onChangeIsActiveHandler = (e: CheckboxChangeEvent) => {
    setIsActive(e.target.checked);
  };

  const onFinish = async (
    values: AddNewEmployeeRequestType | UpdateEmployeeRequestType
  ) => {
    try {
      if (initialEmployee) {
        const updatedEmployee: UpdateEmployeeRequestType = {
          firstName: values.firstName,
          lastName: values.lastName,
          dob: dayjs(values.dob).format(dateFormat),
          email: values.email,
          isActive: active,
          skillLevels: selectedSkills,
        };

        console.log(updatedEmployee);

        const updateEmployeeResponse = await updateEmployee(
          initialEmployee._id,
          updatedEmployee
        );

        if (updateEmployeeResponse.status === 200) {
          if (onMutationResolved) {
            onMutationResolved(true);
          }
        }
      } else {
        const newEmployee: AddNewEmployeeRequestType = {
          firstName: values.firstName,
          lastName: values.lastName,
          dob: dayjs(values.dob).format(dateFormat),
          email: values.email,
          isActive: active,
          skillLevels: selectedSkills,
        };

        const addEmployeeResponse = await addNewEmployee(newEmployee);

        if (addEmployeeResponse.status === 201) {
          form.resetFields();
          setSelectedSkills([]);
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

  function datepickerInitialValue() {
    const inputFormat =
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (Greenwich Mean Time)";

    if (initialEmployee) {
      return dayjs(initialEmployee.dob, { format: inputFormat }).startOf("day");
    }

    return dayjs("1991-12-05");
  }

  useEffect(() => {
    if (initialEmployee != undefined) {
      const dobValue = datepickerInitialValue();

      form.setFieldValue("dob", dobValue);

      setSelectedSkills(initialEmployee.skillLevels);
    }
  }, [initialEmployee, datepickerInitialValue, form]);

  const initialValuesInitialiser = () => {
    if (initialEmployee) {
      return {
        ...initialEmployee,
        dob: dayjs(initialEmployee.dob).format(dateFormat),
      };
    }
    return { remember: true };
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name={initialEmployee ? "edit_employee" : "add_employee"}
      className="employee-form"
      onFinish={onFinish}
    >
      <Form.Item
        label="First name"
        name="firstName"
        initialValue={initialEmployee ? initialEmployee.firstName : ""}
        rules={[{ required: true, message: "Please input first name" }]}
      >
        <Input placeholder="First name" />
      </Form.Item>
      <Form.Item
        label="Last name"
        name="lastName"
        initialValue={initialEmployee ? initialEmployee.lastName : ""}
        rules={[{ required: true, message: "Please input last name" }]}
      >
        <Input placeholder="Last name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        initialValue={initialEmployee ? initialEmployee.email : ""}
        rules={[{ required: true, message: "Please input email" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>

      <Input.Group>
        <Row justify={"space-evenly"}>
          <Col>
            <Form.Item label="Status" name="isActive" valuePropName="checked">
              <Checkbox
                defaultChecked={
                  initialEmployee ? initialEmployee.isActive : true
                }
                onChange={onChangeIsActiveHandler}
              >
                {active ? "Active" : "Not Active"}
              </Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Date of birth"
              name="dob"
              rules={[
                { required: true, message: "Please input date of birth" },
              ]}
            >
              <DatePicker
                // value={dayjs().subtract(18, "year")}
                format={dateFormat}
              />
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>

      <Form.Item
        label="Select skills"
        name="skills"
        initialValue={
          initialEmployee
            ? initialEmployee.skillLevels?.map((skill: any) => skill)
            : undefined
        }
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select skills"
          onChange={handleSelectSkillChange}
          options={options}
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
