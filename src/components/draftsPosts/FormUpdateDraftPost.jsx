import './FormUpdateDraftPost.scss';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUpdateDraftPostMutation } from '../../store';
import * as DOMPurify from 'dompurify';

import { useEffect } from 'react';

const FormUpdateDraftPost = ({ post }) => {
  const [updateDraftPost, { isLoading }] = useUpdateDraftPostMutation();
  const { register, handleSubmit, setFocus } = useForm({
    defaultValues: {
      _id: post._id,
      title: post.title,
      body: post.body,
    },
  });
  const navigate = useNavigate();

  const handleUpdate = async ({ body }) => {
    const draft = {
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

  const options = (
    <>
      {post.tags.map((tag) => (
        <option value={tag._id}>{tag.name}</option>
      ))}
    </>
  );

  useEffect(() => {
    setFocus('body');
  }, []);

  return (
    <>
      <Form className="form-create-draft-post">
        <Form.Group controlId="formGridTitle">
          <Form.Label>Título do post</Form.Label>
          <Form.Control type="string" {...register('title')} disabled />
        </Form.Group>
        <Form.Group controlId="formGridTags">
          <Form.Label>Tags</Form.Label>
          <Form.Select aria-label="Select tags">{options}</Form.Select>
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

        <Form.Group className="d-flex pt-3 justify-content-end">
          <div className="pe-2">
            <Button
              onClick={() =>
                navigate(`/admin/posts/draft/${post.name}/preview`)
              }
              disabled={isLoading}
            >
              Visualizar
            </Button>
          </div>
          <div>
            <Button onClick={handleSubmit(handleUpdate)}>Salvar</Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormUpdateDraftPost;
