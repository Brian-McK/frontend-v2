import { useState } from "react";
import { SkillsTable } from "./SkillsTable";
import { Col, Row, Card } from "antd";
import { ISkillsArray } from "../../services/skillsservice";
import { SkillForm } from "./SkillForm";
import { IMutationResolved } from "../../Interfaces/MutationInterface";

type ManageSkillsProps = {
  initialSkills: ISkillsArray | null;
  initialLoading: boolean;
} & IMutationResolved;

export const ManageSkills: React.FC<ManageSkillsProps> = ({
  initialSkills,
  initialLoading,
  onMutationResolved,
}: ManageSkillsProps) => {
  const [error, setError] = useState<string | null>(null); // TODO - ERROR STATE

  return (
    <>
      <Row gutter={16}>
        <Col sm={24} lg={8}>
          <Card title={"Add a skill"} loading={initialLoading}>
            <SkillForm onMutationResolved={onMutationResolved} />
          </Card>
        </Col>
        <Col sm={24} lg={16}>
          <Card title={"Skill levels"} loading={initialLoading}>
            <SkillsTable
              onMutationResolved={onMutationResolved}
              isLoadingSkills={initialLoading}
              skills={initialSkills}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};
