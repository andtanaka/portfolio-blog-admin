import './AppPage.scss';
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { menuAppOptions } from '../refs/options';

const AppPage = () => {
  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  return (
    <>
      <Container fluid className="p-0">
        <Container className="main-container">
          <Row className="mx-2 justify-content-center">
            {menuAppOptions.map((op) => {
              return (
                <Col key={op.value} xs={6} sm={4} md={3}>
                  <Card
                    className="text-center"
                    onClick={() => handleClick(op.value)}
                  >
                    <Card.Title>{op.icon}</Card.Title>
                    <Card.Body>{op.label}</Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default AppPage;
