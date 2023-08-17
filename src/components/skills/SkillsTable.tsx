import { SearchOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Tooltip } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { ISkill, ISkillsArray } from "../../services/skillsservice";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { deleteSkill } from "../../services/skillsservice";
import { IMutationResolved } from "../../Interfaces/MutationInterface";

type SkillTableProps = {
  skills: ISkillsArray | null;
  isLoadingSkills: boolean;
} & IMutationResolved;

type SkillDataIndex = ISkill["_id"];

// TODO - ADD HORIZONTAL SCROLL TO TABLE, MAKE IT BETTER RESPONSIVE

export const SkillsTable: React.FC<SkillTableProps> = ({
  skills,
  isLoadingSkills,
  onMutationResolved,
}: SkillTableProps) => {
  const [searchText, setSearchText] = useState<any | null>(null);
  const [searchedColumn, setSearchedColumn] = useState<string | null>(null);
  const searchInput = useRef<InputRef | null>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: SkillDataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const handleDeleteSkill = async (value: ISkill) => {
    try {
      const { _id } = value;

      const deleteSkillResponse = await deleteSkill(_id);

      if (deleteSkillResponse.status === 200) {
        // trigger for refetching skills
        onMutationResolved(true);
      }
    } catch (error) {
      onMutationResolved(false);
      console.error(error); // TODO- ERROR STATE
    }

    // TODO - Confirmation modal
  };

  const getColumnSearchProps = (
    dataIndex: SkillDataIndex
  ): ColumnType<ISkill> => ({
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
      (record[dataIndex as keyof ISkill] as string)
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

  const columns: ColumnsType<ISkill> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "60%",
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.localeCompare(b.description),
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
          <Tooltip title="View skill">
            <Button
              type="primary"
              shape="circle"
              size={"small"}
              icon={<EyeOutlined />}
            />
          </Tooltip>
          <Tooltip title="Edit skill">
            <Button
              type="primary"
              shape="circle"
              size={"small"}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip title="Delete skill">
            <Button
              type="primary"
              shape="circle"
              size={"small"}
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteSkill(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  if (skills === null) {
    return <div>Loading or error message...</div>;
  }

  return (
    <Table
      loading={isLoadingSkills}
      columns={columns}
      dataSource={skills.map((skill) => ({ ...skill, key: skill._id }))}
    />
  );
};
