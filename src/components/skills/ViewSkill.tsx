import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ISkill } from "../../services/skillsservice";
import { Row, Col, Button, Tooltip } from "antd";
import { RollbackOutlined, EditOutlined } from "@ant-design/icons";

export const ViewSkill: React.FC = () => {
  const { skillId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const skillData: ISkill = state.skill;

  const handleReturnToPrevious = () => {
    navigate(-1);
  };

  const handleNavigateToEdit = () => {
    navigate(`/dashboard/manage-skills/edit/${skillId}`, {
      state,
    });
  };

  return (
    <>
      <Row>
        <Col>skill name</Col>
        <Col>
          <Tooltip title="Return to list of skills">
            <Button
              type="primary"
              icon={<RollbackOutlined />}
              onClick={handleReturnToPrevious}
            >
              Return to skills
            </Button>
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Edit skill">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={handleNavigateToEdit}
            >
              Edit skill
            </Button>
          </Tooltip>
        </Col>
      </Row>
      <Row>
        <Col>Skill picture</Col>
        <Col>Skill details</Col>
      </Row>
    </>
  );
};
