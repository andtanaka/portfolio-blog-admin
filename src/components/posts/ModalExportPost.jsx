import '../../styles/ModalForm.scss';
import { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/modal';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { useAddDraftPostFromPostMutation } from '../../store';
import createName from '../../utils/createName';

const exportTypes = {
  toDraftPost: 'toDraftPost',
  toJsonFile: 'toJsonFile',
};

const ModalExportPost = ({ type, post, children }) => {
  const [createDraftPost, { isLoading }] = useAddDraftPostFromPostMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: `${post.title} - Cópia`,
      fileName: `${post.name}`,
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    reset();
    setShow(false);
  };

  const handleCreate = async ({ title }) => {
    try {
      const draft = {
        name: createName(title),
        title,
      };
      await createDraftPost({ postId: post._id, ...draft }).unwrap();
      handleClose();
      toast.success('Rascunho salvo com sucesso');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleExportData = async ({ fileName }) => {
    const fileData = JSON.stringify(post);
    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${fileName}.json`;
    link.href = url;
    link.click(); //criar botão para baixar o arquivo se não for automático
  };

  return (
    <>
      <p onClick={() => setShow(true)}>{children}</p>
      {/* Exporta o post para um novo rascunho */}
      {type === exportTypes.toDraftPost && (
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
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit(handleCreate)} disabled={isLoading}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/* Exporta o post para um arquivo json */}
      {type === exportTypes.toJsonFile && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Exportar post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group controlId="formGridTitle">
                  <Form.Label>Nome do arquivo</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder="Nome do arquivo"
                    {...register('fileName', { required: true })}
                    aria-invalid={errors.fileName ? 'true' : 'false'}
                  />
                  {errors.fileName?.type === 'required' && (
                    <small role="alert">Preencha o nome do arquivo</small>
                  )}
                </Form.Group>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer id="modal-footer">
            <Button onClick={handleSubmit(handleExportData)}>Salvar</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ModalExportPost;
