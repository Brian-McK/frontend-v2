import { useState, useEffect } from "react";
import { SkillsTable } from "./SkillsTable";
import { Col, Row, Card } from "antd";
import {
  SkillsArray,
  ISkill,
  getAllSkills,
} from "../../services/skillsservice";
import { AddSkillForm } from "./AddSkillForm";

export const ManageSkills: React.FC = () => {
  const [skills, setSkills] = useState<SkillsArray | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // call to api

  useEffect(() => {
    async function fetchSkills() {
      try {
        const skillsResponse = await getAllSkills();
        setSkills(skillsResponse);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  return (
    <>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Card title={"Add a skill"} loading={loading}>
            <AddSkillForm />
          </Card>
        </Col>
        <Col sm={24} lg={16}>
          <Card title={"Skill levels"} loading={loading}>
            <SkillsTable isLoadingSkills={loading} skills={skills} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
