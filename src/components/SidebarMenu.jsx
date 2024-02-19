import './SidebarMenu.scss';

import { useState } from 'react';
import classNames from 'classnames';
import { IoCloseSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { ListGroup, Row } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { menuAppOptions } from '../refs/options';

function SidebarMenu() {
  const [open, setOpen] = useState(0); // 0, 1 ou 2
  const { userInfo } = useSelector((state) => state.auth);

  const shrinkClassNames = classNames({
    'd-none': open === 1,
  });

  const handleClick = () => {
    open === 2 ? setOpen(0) : setOpen(open + 1);
  };

  return (
    <div className="align-items-start sidemenu">
      <Collapse in={open > 0} dimension="width">
        <div id="sidebar-menu">
          <ListGroup>
            <ListGroup.Item className="text-center">
              <Link to="/admin/user">
                <CgProfile size="2em" />
              </Link>
              <Link to="/admin/user">
                <p className={shrinkClassNames}>{userInfo.name}</p>
              </Link>
            </ListGroup.Item>
            {menuAppOptions.map((op) => {
              return (
                <ListGroup.Item
                  key={op.label}
                  className={classNames('d-flex border-0', {
                    'justify-content-center': open === 1,
                    'px-2': open === 2,
                  })}
                >
                  <Link to={op.value}>
                    <span className={classNames({ 'pe-3': open === 2 })}>
                      {op.icon}
                    </span>
                    <span className={shrinkClassNames}>{op.label}</span>
                  </Link>
                </ListGroup.Item>
              );
            })}
            <ListGroup.Item className="p-0"></ListGroup.Item>
            <ListGroup.Item className="text-center">
              <button className="btn">Sair</button>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </Collapse>
      <div>
        <Row>
          <button
            className="btn btn-sidemenu"
            onClick={handleClick}
            aria-controls="sidebar-menu"
            aria-expanded={open}
            id="sidebarToggle"
          >
            {open < 2 ? <FaAngleRight size="1rem" /> : <FaAngleLeft />}
          </button>
        </Row>
        <Row>
          <button
            className={classNames('btn btn-sidemenu', {
              'd-none': open === 0,
            })}
            id="sidebarClose"
            onClick={() => setOpen(0)}
          >
            <IoCloseSharp />
          </button>
        </Row>
      </div>
    </div>
  );
}

export default SidebarMenu;
