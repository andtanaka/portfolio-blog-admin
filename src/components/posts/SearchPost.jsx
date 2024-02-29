import './SearchPost.scss';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Dropdown, Form, InputGroup, Row } from 'react-bootstrap';
import { sortPosts } from '../../refs/sort';
import { useQuery } from '../../hooks/useQuery';
import { getSearchUrl } from '../../utils/getSearchUrl';

const SearchPost = ({ url }) => {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      text: '',
    },
  });
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = ({ text }) => {
    const search = getSearchUrl({ text });

    navigate(`${url}${search}`);
    reset();
  };

  const handleClick = (option) => {
    query.delete('sort');
    const search = query.toString();

    navigate({
      pathname: location.pathname,
      search: search
        ? `${search}&sort=${option.value}`
        : `?sort=${option.value}`,
    });
  };
  const sortOptions = (
    <Dropdown>
      <Dropdown.Toggle className="btn" id="sort-drafts-posts">
        Ordenar
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {sortPosts.map((op) => {
          return (
            <Dropdown.Item key={op.value} onClick={() => handleClick(op)}>
              {op.label}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
  return (
    <div>
      <Form className="form-search-drafts-posts">
        <Row className="mb-3">
          <Col xs={12} sm={6} md={4}>
            <InputGroup className="mb-3">
              <Form.Control type="text" {...register('text')} />
              <Button onClick={handleSubmit(handleSearch)}>Pesquisar</Button>
            </InputGroup>
          </Col>
          <Col className="d-flex">{sortOptions}</Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchPost;
