// import './SearchPost.scss';
// import { sortPosts } from '../../../refs/sort';
// import { useForm } from 'react-hook-form';
// import { useQuery } from '../../../hooks/useQuery';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { getSearchUrl } from '../../../utils/getSearchUrl';
// import { Col, Dropdown, Form, Row } from 'react-bootstrap';
// import { useEffect, useState } from 'react';

// const SearchPost = ({ url }) => {
//   const { register, reset, handleSubmit } = useForm({
//     defaultValues: {
//       name: '',
//       sector: '',
//     },
//   });
//   const query = useQuery();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [descriptionView, setDescriptionView] = useState(true);
//   const [sectorView, setSectorView] = useState(true);
//   const [unitView, setUnitView] = useState(true);
//   const [lastPriceView, setLastPriceView] = useState(true);

//   const columnDescription = document.querySelectorAll('.column-description');
//   const columnSector = document.querySelectorAll('.column-sector');
//   const columnUnit = document.querySelectorAll('.column-unit');
//   const columnLastPrice = document.querySelectorAll('.column-lastPrice');

//   const columnTrigger = (element, status) => {
//     if (!status) {
//       element.forEach((cell) => cell.classList.add('d-none'));
//     } else {
//       element.forEach((cell) => cell.classList.remove('d-none'));
//     }
//   };

//   const handleSearch = ({ name, sector }) => {
//     const list = query.get('list');
//     const search = getSearchUrl({ name, sector, list });

//     navigate(`${url}${search}`);
//     reset();
//   };

//   const handleClick = (option) => {
//     query.delete('sort');
//     const search = query.toString();

//     navigate({
//       pathname: location.pathname,
//       search: search
//         ? `${search}&sort=${option.value}`
//         : `?sort=${option.value}`,
//     });
//   };

//   const sortOptions = (
//     <Dropdown>
//       <Dropdown.Toggle className="btn" id="sort-products">
//         Ordenar
//       </Dropdown.Toggle>
//       <Dropdown.Menu>
//         {sortPosts.map((op) => {
//           return (
//             <Dropdown.Item key={op.value} onClick={() => handleClick(op)}>
//               {op.label}
//             </Dropdown.Item>
//           );
//         })}
//       </Dropdown.Menu>
//     </Dropdown>
//   );

//   const viewParams = (
//     <>
//       <Form className="form-search-products">
//         <Form.Check inline type="checkbox">
//           <Form.Check.Input
//             className="custom-form-check-input"
//             checked={descriptionView}
//             onChange={() => setDescriptionView(!descriptionView)}
//           />
//           <Form.Check.Label>Descrição</Form.Check.Label>
//         </Form.Check>
//         <Form.Check inline type="checkbox">
//           <Form.Check.Input
//             className="custom-form-check-input"
//             checked={sectorView}
//             onChange={() => setSectorView(!sectorView)}
//           />
//           <Form.Check.Label>Setor</Form.Check.Label>
//         </Form.Check>

//         <Form.Check inline type="checkbox">
//           <Form.Check.Input
//             className="custom-form-check-input"
//             checked={unitView}
//             onChange={() => setUnitView(!unitView)}
//           />
//           <Form.Check.Label>Unidade</Form.Check.Label>
//         </Form.Check>
//         <Form.Check inline type="checkbox">
//           <Form.Check.Input
//             className="custom-form-check-input"
//             checked={lastPriceView}
//             onChange={() => setLastPriceView(!lastPriceView)}
//           />
//           <Form.Check.Label>Último preço</Form.Check.Label>
//         </Form.Check>
//       </Form>
//     </>
//   );

//   useEffect(() => {
//     columnTrigger(columnDescription, descriptionView);
//     columnTrigger(columnSector, sectorView);
//     columnTrigger(columnUnit, unitView);
//     columnTrigger(columnLastPrice, lastPriceView);
//   }, [descriptionView, sectorView, unitView, lastPriceView]);

//   return (
//     <div>
//       <Form
//         className="form-search-products"
//         onSubmit={handleSubmit(handleSearch)}
//       >
//         <Row className="mb-3">
//           <Form.Group as={Col} md="4" sm="6">
//             <Form.Label>Produto</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Tricoline"
//               {...register('name')}
//             />
//           </Form.Group>
//           <Form.Group as={Col} md="4" sm="6">
//             <Form.Label>Setor</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Tecido"
//               {...register('sector')}
//             />
//           </Form.Group>
//           <Form.Group as={Col} md="4" className="d-flex align-items-end pt-3">
//             <div>
//               <button type="submit" className="btn">
//                 Pesquisar
//               </button>
//             </div>
//             <div className="ms-auto">{sortOptions}</div>
//           </Form.Group>
//         </Row>
//       </Form>
//       {viewParams}
//     </div>
//   );
// };

// export default SearchPost;
