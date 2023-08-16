import { useState, useEffect } from "react";
import { SkillsTable } from "./SkillsTable";
import { Col, Row, Card } from "antd";
import { ISkillsArray, getAllSkills } from "../../services/skillsservice";
import { AddSkillForm } from "./AddSkillForm";

type GetSkillsResponseType = {
  data: ISkillsArray;
  status: number;
};

export const ManageSkills: React.FC = () => {
  const [skills, setSkills] = useState<ISkillsArray | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // TODO - ERROR STATE
  const [
    requestRefetchSkillsFromMutation,
    setRequestRefetchSkillsFromMutation,
  ] = useState<boolean>(false);

  const handleMutationResolvedStatus = (data: boolean) => {
    setRequestRefetchSkillsFromMutation(data);
  };

  // call to api

  const fetchSkills = async () => {
    try {
      const skillsResponse: GetSkillsResponseType = await getAllSkills();
      setSkills(skillsResponse.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (requestRefetchSkillsFromMutation) {
      fetchSkills();
      setRequestRefetchSkillsFromMutation(false);
    }
  }, [requestRefetchSkillsFromMutation]);

  return (
    <>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Card title={"Add a skill"} loading={loading}>
            <AddSkillForm onMutationResolved={handleMutationResolvedStatus} />
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
