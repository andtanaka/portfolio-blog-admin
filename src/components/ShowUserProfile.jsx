import './ShowUserProfile.scss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Form } from 'react-bootstrap';

const ShowUserProfile = ({ user }) => {
  const { register } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  return (
    <Container className="container-form">
      <Row>
        <h3 className="title">Detalhes usuário</h3>
      </Row>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="string"
            {...register('name', { required: true })}
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', { required: true })}
            disabled
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ShowUserProfile;
