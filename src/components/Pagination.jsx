import './Pagination.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';

const Pagination = ({ pages, page, url }) => {
  const [pageNav, setPageNav] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const start = page === pages ? Math.max(page - 3, 0) : Math.max(page - 2, 0);
  const end =
    page === 1 ? Math.min(pages, page + 2) : Math.min(pages, page + 1);
  const index = [...Array(Number(pages)).keys()].slice(start, end);

  const handlePagination = (e) => {
    e.preventDefault();
    if (pageNav) {
      navigate(`${url}/page/${pageNav}${location.search}`);
      setPageNav('');
    } else {
      navigate(`${url}${location.search}`);
    }
  };

  const inputPagination = (
    <div>
      <InputGroup className="mb-3 input-pagination">
        <Form.Control
          placeholder={1}
          aria-label="Recipient's page"
          aria-describedby="basic-addon2"
          value={pageNav}
          onChange={(e) => setPageNav(e.target.value)}
        />
        <Button className="btn" id="button-addon2" onClick={handlePagination}>
          Página
        </Button>
      </InputGroup>
    </div>
  );

  const navPagination = (
    <>
      <nav aria-label="Page navigation" className="nav-pagination">
        <ul className="pagination">
          <li className="page-item">
            <Link
              className={`page-link ${page === 1 && 'disabled'}`}
              to={`${url}/page/${page - 1}${location.search}`}
              aria-label="First"
            >
              <span aria-hidden="true">&lt;</span>
            </Link>
          </li>
          {index[0] > 0 && (
            <li className="page-item">
              <Link
                className={`page-link ${page === 1 && 'disabled'}`}
                to={`${url}/page/1${location.search}`}
                aria-label="First"
              >
                <span aria-hidden="true">{`1 ${
                  index[0] > 1 ? '...' : ''
                }`}</span>
              </Link>
            </li>
          )}

          {index.map((p) => {
            p += 1;
            return (
              <li key={p} className="page-item">
                <NavLink
                  className="page-link"
                  to={`${url}/page/${p}${location.search}`}
                >
                  {p}
                </NavLink>
              </li>
            );
          })}

          {index[index.length - 1] !== pages - 1 && (
            <li className="page-item">
              <Link
                className={`page-link ${page === pages && 'disabled'}`}
                to={`${url}/page/${pages}${location.search}`}
                aria-label="Last"
              >
                <span aria-hidden="true">{`${
                  index[index.length - 1] < pages - 2 ? '...' : ''
                }${pages}`}</span>
              </Link>
            </li>
          )}

          <li className="page-item">
            <Link
              className={`page-link ${page === pages && 'disabled'}`}
              to={`${url}/page/${page + 1}${location.search}`}
              aria-label="Last"
            >
              <span aria-hidden="true">&gt;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );

  return (
    pages > 1 && (
      <div className="d-flex justify-content-center">
        <Row>
          <Col xs={12} md={8} className="d-flex justify-content-center">
            {navPagination}
          </Col>
          <Col xs={12} md={4} className="d-flex justify-content-center">
            {pages > 5 && inputPagination}
          </Col>
        </Row>
      </div>
    )
  );
};

export default Pagination;
