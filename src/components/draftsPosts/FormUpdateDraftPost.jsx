import './FormUpdateDraftPost.scss';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Button, Form } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGetTagsQuery, useUpdateDraftPostMutation } from '../../store';
import * as DOMPurify from 'dompurify';

import { useEffect } from 'react';
import Loader from '../Loader';
import { setOptionsTags } from '../../store/slices/tagSlice';
import { useDispatch, useSelector } from 'react-redux';
import createName from '../../utils/createName';

const FormUpdateDraftPost = ({ post, tagsOptions }) => {
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
      subtitle: post.subtitle,
      body: post.body,
      tags: tagsOptions,
    },
  });
  const navigate = useNavigate();

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: 'white',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isFocused || isSelected ? '#01b6ad' : 'white',
        color: 'black',
      };
    },
  };

  if (loadingTags) {
    content = <Loader />;
  } else if (error) {
    content = <p>Erro</p>;
  } else {
    tagsDB = data.tagsOptions;
    content = (
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            styles={colourStyles}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={optionsTags}
          />
        )}
      />
    );
  }

  const handleUpdate = async ({ title, subtitle, body, tags }) => {
    const draft = {
      title,
      name: createName(title),
      subtitle,
      body: DOMPurify.sanitize(body),
      tags,
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
    if (post.posted) {
      navigate(`/admin/posts/${post.post}`);
    }
  }, [data]);

  return (
    <>
      <Form className="form-create-draft-post">
        <Form.Group controlId="formGridTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control type="string" {...register('title')} />
        </Form.Group>
        <Form.Group controlId="formGridSubtitle">
          <Form.Label>Subtítulo</Form.Label>
          <Form.Control
            type="string"
            {...register('subtitle')}
            as="textarea"
            style={{ height: '70px' }}
          />
        </Form.Group>
        <Form.Group controlId="formGridTags">
          <Form.Label>Tags</Form.Label>
          {content}
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
              onClick={() => navigate(`/admin/posts/draft/${post._id}/preview`)}
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
