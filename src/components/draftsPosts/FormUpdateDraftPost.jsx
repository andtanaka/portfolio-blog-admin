import './FormUpdateDraftPost.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGetTagsQuery, useUpdateDraftPostMutation } from '../../store';
import * as DOMPurify from 'dompurify';

import { useEffect, useState } from 'react';
import Loader from '../Loader';
import { setOptionsTags } from '../../store/slices/tagSlice';
import { useDispatch, useSelector } from 'react-redux';

const FormUpdateDraftPost = ({ post }) => {
  const dispatch = useDispatch();
  const { optionsTags } = useSelector((state) => state.tag);
  const animatedComponents = makeAnimated();

  const {
    data,
    isLoading: loadingTags,
    error,
  } = useGetTagsQuery({ name: '', sort: '' });
  let content = <></>;
  let tagsDB;

  const [updateDraftPost, { isLoading }] = useUpdateDraftPostMutation();
  const { register, handleSubmit, setFocus, control } = useForm({
    defaultValues: {
      _id: post._id,
      title: post.title,
      body: post.body,
    },
  });
  const navigate = useNavigate();

  if (loadingTags) {
    content = <Loader />;
  } else if (error) {
    content = <p>Erro</p>;
  } else {
    tagsDB = [
      ...data.tags.map((tag) => {
        return { value: tag._id, label: tag.name };
      }),
    ];
    content = (
      <Controller
        name="select"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={optionsTags}
          />
        )}
      />
    );
  }

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

  useEffect(() => {
    setFocus('body');
  }, []);

  useEffect(() => {
    if (tagsDB) {
      dispatch(setOptionsTags(tagsDB));
    }
  }, [data]);

  return (
    <>
      <Form className="form-create-draft-post">
        <Form.Group controlId="formGridTitle">
          <Form.Label>Título do post</Form.Label>
          <Form.Control type="string" {...register('title')} disabled />
        </Form.Group>
        {content}
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
