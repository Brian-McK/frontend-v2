import { useParams, useLocation, useNavigate } from "react-router-dom";
import { IEmployee } from "../../services/employeeservice";
import {
  Row,
  Col,
  Button,
  Tooltip,
  Card,
  Image,
  Divider,
  Typography,
  Tag,
} from "antd";
import { RollbackOutlined, EditOutlined } from "@ant-design/icons";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { ISkill, ISkillsArray } from "../../services/skillsservice";

const { Title, Text } = Typography;

export const ViewEmployee: React.FC = () => {
  const { employeeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const employeeData: any = state.employee;
  const skillData: ISkillsArray = state.skills;

  const handleReturnToPrevious = () => {
    navigate(-1);
  };

  const handleNavigateToEdit = () => {
    navigate(`/dashboard/manage-employees/edit/${employeeId}`, {
      state,
    });
  };

  return (
    <>
      <Row justify={"center"}>
        <Col sm={24} lg={16}>
          <Card
            title={`Employee: ${employeeData.firstName} ${employeeData.lastName}`}
            extra={
              <Tooltip title="Edit employee">
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={handleNavigateToEdit}
                >
                  Edit employee
                </Button>
              </Tooltip>
            }
          >
            <Row gutter={16}>
              <Col
                xs={24}
                sm={8}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  style={{
                    width: "100%",
                    maxHeight: "250px",
                    maxWidth: "250px",
                  }}
                  src="error" // TODO - FIX HERE
                  fallback="data:image/png;base64,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"
                />
              </Col>
              <Col xs={24} sm={16}>
                <Row>
                  <Col span={24}>
                    <Title level={5}>Employee Details</Title>
                  </Col>
                  <Col span={24}>
                    <Text strong>Name: </Text>
                    <Text>{`${employeeData.firstName} ${employeeData.lastName}`}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>Email: </Text>
                    <Text>{`${employeeData.email}`}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>Status: </Text>
                    {employeeData.isActive ? (
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    ) : (
                      <CloseCircleTwoTone twoToneColor="red" />
                    )}
                  </Col>
                  <Col span={24}>
                    <Text strong>Date of birth: </Text>
                    <Text>{`${employeeData.dob}`}</Text>
                  </Col>
                  <Divider />
                  <Col span={24}>
                    <Text strong>
                      Skills:{" "}
                      {employeeData.skillLevels &&
                      employeeData.skillLevels.length > 0 ? (
                        employeeData.skillLevels.map(
                          (skillLevel: ISkill, index: number) => (
                            <Tag key={index} color="cyan">
                              {skillLevel.name}
                            </Tag>
                          )
                        )
                      ) : (
                        <Text>
                          No skills for{" "}
                          {`${employeeData.firstName} ${employeeData.lastName}`}
                        </Text>
                      )}
                    </Text>
                  </Col>
                </Row>
                <Divider />
                <Text strong>
                  <Text italic>Created: {employeeData.createdAt}</Text>
                </Text>
              </Col>
            </Row>
            <Divider />
            <Row justify={"end"}>
              <Col>
                <Tooltip title="Return to list of employees">
                  <Button
                    type="primary"
                    icon={<RollbackOutlined />}
                    onClick={handleReturnToPrevious}
                  >
                    Return to employees
                  </Button>
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};
