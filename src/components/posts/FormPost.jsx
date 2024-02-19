// import './FormPost.scss';
// import { Button, Col, Form, Row } from 'react-bootstrap';
// import { useForm } from 'react-hook-form';
// import { useAddProductMutation } from '../../../store';
// import { toast } from 'react-toastify';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const FormPost = () => {
//   const [createProduct] = useAddProductMutation();
//   const {
//     register,
//     formState: { errors },
//     handleSubmit,
//     setFocus,
//     reset,
//   } = useForm();
//   const navigate = useNavigate();

//   const handleCreate = async (data) => {
//     try {
//       await createProduct({
//         ...data,
//         lastPrice: Number(commaToDot(data.lastPrice)).toFixed(2),
//       });
//       toast.success('Produto criado com sucesso');
//       reset();
//       navigate('/app/produtos');
//     } catch (err) {
//       console.log(err);
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   useEffect(() => {
//     setFocus('name');
//   }, []);

//   return (
//     <>
//       <Form onSubmit={handleSubmit(handleCreate)} className="form-show-post">
//         <Row>
//           <h3 className="title">Novo produto</h3>
//         </Row>
//         <Row className="mb-3">
//           <Form.Group controlId="formGridName">
//             <Form.Label>Nome</Form.Label>
//             <Form.Control
//               type="string"
//               {...register('name', { required: true })}
//               aria-invalid={errors.name ? 'true' : 'false'}
//             />
//             {errors.name?.type === 'required' && (
//               <small role="alert">Insira o nome do produto</small>
//             )}
//           </Form.Group>
//           <Form.Group controlId="formGridDescription">
//             <Form.Label>Descrição</Form.Label>
//             <Form.Control
//               type="string"
//               as="textarea"
//               {...register('description')}
//               style={{ height: '60px' }}
//             />
//           </Form.Group>
//           <Form.Group as={Col} xs={12} sm={4} controlId="formGridSector">
//             <Form.Label>Setor</Form.Label>
//             <Form.Control type="string" {...register('sector')} />
//           </Form.Group>
//           <Form.Group as={Col} xs={12} sm={4} controlId="formGridUnit">
//             <Form.Label>Unidade</Form.Label>
//             <Form.Control type="string" {...register('unit')} />
//           </Form.Group>
//           <Form.Group as={Col} xs={12} sm={4} controlId="formGridLastPrice">
//             <Form.Label>Último preço</Form.Label>
//             <Form.Control type="string" {...register('lastPrice')} />
//           </Form.Group>

//           <Form.Group controlId="formGridNotes">
//             <Form.Label>Notas</Form.Label>
//             <Form.Control
//               type="string"
//               as="textarea"
//               {...register('notes')}
//               style={{ height: '60px' }}
//             />
//           </Form.Group>

//           <Form.Group className=" text-end pt-3">
//             <div>
//               <Button type="submit">Salvar</Button>
//             </div>
//           </Form.Group>
//         </Row>
//       </Form>
//     </>
//   );
// };

// export default FormPost;
