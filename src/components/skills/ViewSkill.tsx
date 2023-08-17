import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ISkill } from "../../services/skillsservice";
import { Row, Col, Button, Tooltip } from "antd";

export const ViewSkill: React.FC = () => {
  const { skillId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const skillData: ISkill = state.skill;

  const handleReturnToPrevious = () => {
    navigate(-1);
  };

  const handleGoToEdit = () => {
    navigate(`edit/${skillId}`, {
      state,
    });
  };

  return (
    <>
      <Row>
        <Col>skill name</Col>
        <Col>return to list button</Col>
      </Row>
      <Row>
        <Col>Skill picture</Col>
        <Col>Skill details</Col>
        <Col>
          <Button title="Go back" onClick={handleReturnToPrevious} />
        </Col>
      </Row>
    </>
  );
};
