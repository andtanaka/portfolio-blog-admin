import './FormUpdateDraftPost.scss';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUpdateDraftPostMutation } from '../../store';
import * as DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import { useEffect, useState } from 'react';
import createName from '../../utils/createName';

const FormUpdateDraftPost = ({ post }) => {
  const [updateDraftPost] = useUpdateDraftPostMutation();
  const [content, setContent] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: post.name,
      title: post.title,
      subtitle: post.subtitle,
      body: post.body,
    },
  });
  const navigate = useNavigate();

  const handleUpdate = async ({ title, subtitle, body }) => {
    const draft = {
      name: createName(title),
      title,
      subtitle,
      body: DOMPurify.sanitize(body),
    };

    try {
      await updateDraftPost({ ...post, ...draft }).unwrap();
      toast.success('Post salvo');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  // const options = (
  //   <>
  //     {tags.map((tag) => (
  //       <option value={tag.value}>{tag.label}</option>
  //     ))}
  //   </>
  // );

  // useEffect(() => {
  //   setFocus('name');
  // }, []);

  return (
    <>
      <Form className="form-create-draft-post">
        <Row>
          <h3 className="title">Novo rascunho</h3>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formGridTitle">
            <Form.Label>Título do post</Form.Label>
            <Form.Control type="string" {...register('title')} />
          </Form.Group>
          <Form.Group controlId="formGridSubtitle">
            <Form.Label>Subtítulo do post</Form.Label>
            <Form.Control type="string" {...register('subtitle')} />
          </Form.Group>
          <Form.Group controlId="formGridBody">
            <Form.Label>Conteúdo</Form.Label>
            <Form.Control
              type="string"
              as="textarea"
              {...register('body')}
              style={{ height: '300px' }}
            />
            <small>Aceita formato markdown e html.</small>
          </Form.Group>
          {/* <Form.Group controlId="formGridTags">
            <Form.Label>Tags</Form.Label>
            <Form.Select aria-label="Select tags">{options}</Form.Select>
          </Form.Group> */}

          <Form.Group className=" text-end pt-3">
            <div>
              <Button onClick={handleSubmit(handleUpdate)}>Salvar</Button>
            </div>
          </Form.Group>
        </Row>
      </Form>
      {content}
    </>
  );
};

export default FormUpdateDraftPost;
