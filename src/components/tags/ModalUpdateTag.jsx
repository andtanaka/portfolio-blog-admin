import '../../styles/ModalForm.scss';
import { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/modal';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useUpdateTagMutation } from '../../store';

const ModalUpdateTag = ({ tag, children }) => {
  const [updateTag, { isLoading }] = useUpdateTagMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: tag.name,
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset({ keepDefaultValues: true });
    setShow(false);
  };

  const handleUpdate = async ({ name }) => {
    try {
      await updateTag({ ...tag, name }).unwrap();
      handleClose();
      toast.success('Tag editada com sucesso');
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
          <Modal.Title>Editar Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group controlId="formGridTitle">
                <Form.Label>Nome da tag</Form.Label>
                <Form.Control
                  type="string"
                  {...register('name', { required: true, pattern: /[a-z0-9]/ })}
                  aria-invalid={errors.name ? 'true' : 'false'}
                />
                {errors.name?.type === 'required' && (
                  <small role="alert">Preencha o nome da tag</small>
                )}
                {errors.name?.type === 'pattern' && (
                  <small role="alert">
                    Escreva a tag apenas com letras minúsculas ou números. O
                    nome não pode conter espaços.
                  </small>
                )}
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit(handleUpdate)} disabled={isLoading}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateTag;
