import '../../styles/ModalForm.scss';
import { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/modal';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useAddTagMutation } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionsTags } from '../../store/slices/tagSlice';

const ModalCreateTag = ({ children }) => {
  const [createTag] = useAddTagMutation();
  const { optionsTags } = useSelector((state) => state.tag);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };

  const handleCreate = async ({ name }) => {
    try {
      const res = await createTag({ name }).unwrap();
      handleClose();
      toast.success('Tag criada com sucesso');

      const newTag = {
        value: res._id,
        label: res.name,
      };
      const tags = [...optionsTags, newTag];

      dispatch(setOptionsTags(tags));
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
          <Modal.Title>Nova Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group controlId="formGridTitle">
                <Form.Label>Nome da tag</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="Nome do post"
                  {...register('name', {
                    required: true,
                    pattern: /^[a-z0-9]*$/,
                  })}
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
          <Button onClick={handleSubmit(handleCreate)}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateTag;
