import { useState } from "react";
import { SkillsTable } from "./SkillsTable";
import { Col, Row, Card } from "antd";
import { ISkillsArray } from "../../services/skillsservice";
import { SkillForm } from "./SkillForm";

type ManageSkillsProps = {
  initialSkills: ISkillsArray | null;
  initialLoading: boolean;
};

export const ManageSkills: React.FC<ManageSkillsProps> = ({
  initialSkills,
  initialLoading,
}: ManageSkillsProps) => {
  const [error, setError] = useState<string | null>(null); // TODO - ERROR STATE
  const [
    requestRefetchSkillsFromMutation,
    setRequestRefetchSkillsFromMutation,
  ] = useState<boolean>(false);

  const handleMutationResolvedStatus = (data: boolean) => {
    setRequestRefetchSkillsFromMutation(data);
  };

  // const fetchSkills = async () => {
  //   try {
  //     const skillsResponse: GetSkillsResponseType = await getAllSkills();
  //     setSkills(skillsResponse.data);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchSkills();
  // }, []);

  // useEffect(() => {
  //   if (requestRefetchSkillsFromMutation) {
  //     fetchSkills();
  //     setRequestRefetchSkillsFromMutation(false);
  //   }
  // }, [requestRefetchSkillsFromMutation]);

  return (
    <>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Card title={"Add a skill"} loading={initialLoading}>
            <SkillForm onMutationResolved={handleMutationResolvedStatus} />
          </Card>
        </Col>
        <Col sm={24} lg={16}>
          <Card title={"Skill levels"} loading={initialLoading}>
            <SkillsTable
              onMutationResolved={handleMutationResolvedStatus}
              isLoadingSkills={initialLoading}
              skills={initialSkills}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
