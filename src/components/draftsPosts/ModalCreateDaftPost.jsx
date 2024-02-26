import './ModalForm.scss';
import { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/modal';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useAddDraftPostMutation } from '../../store';
import createName from '../../utils/createName';

const ModalCreateDraftPost = ({ children }) => {
  const [createDraftPost] = useAddDraftPostMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };

  const handleCreate = async ({ title, subtitle }) => {
    try {
      const draft = {
        name: createName(title),
        title,
        subtitle,
        subtopics: [],
        tags: [],
        body: '',
      };
      await createDraftPost(draft).unwrap();
      handleClose();
      toast.success('Rascunho salvo com sucesso');
    } catch (err) {
      // console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button onClick={() => setShow(true)}>{children}</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Novo rascunho</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group controlId="formGridTitle">
                <Form.Label>Título do post</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Nome do post"
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
                  type="string"
                  as="textarea"
                  style={{ height: '100px' }}
                  placeholder="Resumo do que será apresentado no post"
                  {...register('subtitle')}
                />
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit(handleCreate)}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateDraftPost;
