import './FormUpdatePost.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import * as DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { useGetTagsQuery, useUpdatePostMutation } from '../../store';
import Loader from '../Loader';
import { setOptionsTags } from '../../store/slices/tagSlice';
import createName from '../../utils/createName';
import ModalExportPost from './ModalExportPost';

const FormUpdatePost = ({ post, tagsOptions }) => {
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

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const { register, handleSubmit, setFocus, control } = useForm({
    defaultValues: {
      _id: post._id,
      title: post.title,
      subtitle: post.subtitle,
      body: post.body,
      tags: tagsOptions,
      published: !post.stop,
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

  const handleUpdate = async ({ title, subtitle, body, tags, published }) => {
    const postChanged = {
      name: createName(title),
      title,
      subtitle,
      body: DOMPurify.sanitize(body),
      tags,
      stop: !published,
    };
    try {
      await updatePost({ ...post, ...postChanged }).unwrap();
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
          <Form.Control type="string" {...register('title')} />
        </Form.Group>
        <Form.Group controlId="formGridSubtitle">
          <Form.Label>Subtítulo do post</Form.Label>
          <Form.Control type="string" {...register('subtitle')} />
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
          <Form.Group className="mt-2">
            <Form.Check
              type="switch"
              label="Post publicado"
              {...register('published')}
            />
          </Form.Group>
        </Form.Group>

        <Form.Group className="d-flex pt-3">
          <div className="d-flex w-100 flex-wrap">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="options-to-export">
                Exportar
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <ModalExportPost type="toDraftPost" post={post}>
                    Novo rascunho
                  </ModalExportPost>
                </Dropdown.Item>
                <Dropdown.Item>
                  <ModalExportPost type="toJsonFile" post={post}>
                    Arquivo JSON
                  </ModalExportPost>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex ms-auto">
            <div className="pe-2">
              <Button
                onClick={() => navigate(`/admin/posts/${post._id}/preview`)}
              >
                Visualizar
              </Button>
            </div>
            <div>
              <Button onClick={handleSubmit(handleUpdate)}>Salvar</Button>
            </div>
          </div>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormUpdatePost;
