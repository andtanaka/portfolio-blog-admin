import './HeaderApp.scss';
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import LogNavApp from './LogNavApp.jsx';

const HeaderApp = () => {
  return (
    <header>
      <Container>
        <Row className="py-md-2 my-auto">
          <Col md="6" className="d-none d-md-flex ">
            <NavbarBrand>
              <Link to="/" className="logo">
                Blog Admin
              </Link>
            </NavbarBrand>
          </Col>

          <Col md="6" xs="12" className="d-none d-md-flex justify-content-end">
            <LogNavApp />
          </Col>
        </Row>

        <Row className="d-flex d-md-none ">
          <Link to="/admin" className="navbar-brand text-center py-2 logo">
            Blog Admin
          </Link>
        </Row>
      </Container>
    </header>
  );
};

export default HeaderApp;
