import './ModalForm.scss';
import styles from './ModalEditTitleDaftPost.module.scss';
import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/modal';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useUpdateDraftPostMutation } from '../../store';
import createName from '../../utils/createName';

const ModalEditTitleDraftPost = ({ post, children }) => {
  const [updateDraftPost] = useUpdateDraftPostMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: post.title,
      subtitle: post.subtitle,
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };

  const handleUpdate = async ({ title, subtitle }) => {
    try {
      const draft = {
        name: createName(title),
        title,
        subtitle,
      };
      await updateDraftPost({ ...post, ...draft }).unwrap();
      handleClose();
      toast.success('Título alterado com sucesso');
    } catch (err) {
      // console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Col
        onClick={() => setShow(true)}
        xs={12}
        sm={8}
        md={10}
        className={styles.buttonArea}
      >
        {children}
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar rascunho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group controlId="formGridTitle">
                <Form.Label>Título do post</Form.Label>
                <Form.Control
                  type="string"
                  {...register('title', { required: true })}
                  aria-invalid={errors.title ? 'true' : 'false'}
                />
                {errors.title?.type === 'required' && (
                  <small role="alert">Preencha o título do post</small>
                )}
              </Form.Group>
              <Form.Group controlId="formGridSubtitle">
                <Form.Label>Subtítulo do post</Form.Label>
                <Form.Control
                  as="textarea"
                  type="string"
                  style={{ height: '100px' }}
                  {...register('subtitle')}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit(handleUpdate)}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditTitleDraftPost;
