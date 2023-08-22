import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Tooltip } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { IMutationResolved } from "../../Interfaces/MutationInterface";
import { useNavigate } from "react-router-dom";
import {
  IEmployee,
  IEmployeeArray,
  deleteEmployee,
} from "../../services/employeeservice";

type EmployeeTableProps = {
  employees: IEmployeeArray | null;
  isLoadingEmployees: boolean;
} & IMutationResolved;

type EmployeeDataIndex = IEmployee["_id"];

// TODO - ADD HORIZONTAL SCROLL TO TABLE, MAKE IT BETTER RESPONSIVE

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  isLoadingEmployees,
  onMutationResolved,
}: EmployeeTableProps) => {
  const [searchText, setSearchText] = useState<any | null>(null);
  const [searchedColumn, setSearchedColumn] = useState<string | null>(null);
  const searchInput = useRef<InputRef | null>(null);

  console.log(employees);

  const navigate = useNavigate();

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: EmployeeDataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleDeleteEmployee = async (value: IEmployee) => {
    try {
      const { _id } = value;

      const deleteEmployeeResponse = await deleteEmployee(_id);

      if (deleteEmployeeResponse.status === 200) {
        // trigger for refetching employees
        if (onMutationResolved) {
          onMutationResolved(true);
        }
      }
    } catch (error) {
      if (onMutationResolved) {
        onMutationResolved(false);
      }
      console.error(error); // TODO- ERROR STATE
    }

    // TODO - Confirmation modal
  };

  const handleViewEmployeeNavigate = async (value: IEmployee) => {
    const { _id } = value;

    navigate(`view/${_id}`, {
      state: { employee: value },
    });
  };

  const handleEditEmployeeNavigate = async (value: IEmployee) => {
    const { _id } = value;

    navigate(`edit/${_id}`, {
      state: { employee: value },
    });
  };

  const getColumnSearchProps = (
    dataIndex: EmployeeDataIndex
  ): ColumnType<IEmployee> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex as keyof IEmployee] as string)
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IEmployee> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width: "10%",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width: "10%",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      width: "10%",
      ...getColumnSearchProps("isActive"),
      render: (isActive) => isActive.toString(),
      sorter: (a, b) =>
        a.isActive.toString().localeCompare(b.isActive.toString()),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "10%",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.age - b.age,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "10%",
      sorter: (a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA.getTime() - dateB.getTime();
      },
      render: (createdAt) => new Date(createdAt).toLocaleDateString(),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View employee">
            <Button
              type="primary"
              shape="circle"
              size={"small"}
              icon={<EyeOutlined />}
              onClick={() => handleViewEmployeeNavigate(record)}
            />
          </Tooltip>
          <Tooltip title="Edit employee">
            <Button
              type="primary"
              shape="circle"
              size={"small"}
              icon={<EditOutlined />}
              onClick={() => handleEditEmployeeNavigate(record)}
            />
          </Tooltip>
          <Tooltip title="Delete employee">
            <Button
              type="primary"
              shape="circle"
              size={"small"}
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEmployee(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (employees === null) {
    return <div>Loading or error message...</div>;
  }

  return (
    <Table
      loading={isLoadingEmployees}
      columns={columns}
      dataSource={employees.map((employee) => ({
        ...employee,
        key: employee._id,
      }))}
    />
  );
};
