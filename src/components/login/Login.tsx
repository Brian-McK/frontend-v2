import { LoginForm } from "./LoginForm";
import { useState, useEffect } from "react";
import { Typography, Col, Row, Card } from "antd";

const milisecondsLoadingIndicator = 1000;

const { Title } = Typography;

export const Login: React.FC = () => {
  const [dummyLoading, setDummyLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDummyLoading(false);
    }, milisecondsLoadingIndicator);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Row justify={"center"}>
        <Col span={24}>
          <Title style={{ textAlign: "center" }} level={3}>
            Please login below
          </Title>
        </Col>
        <Col sm={12} lg={8} xl={6}>
          <Card loading={dummyLoading}>
            <LoginForm />
          </Card>
        </Col>
      </Row>
    </>
  );
};
