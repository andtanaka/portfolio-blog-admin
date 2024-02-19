// import './TablePosts.scss';
// import { Button, Table } from 'react-bootstrap';
// import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';
// import ModalShowProduct from './ModalShowProduct';
// import { useRemoveProductMutation } from '../../../store';
// import { toast } from 'react-toastify';
// import { dotToComma } from '../../../utils/dotToComma';

// const TablePosts = ({ products }) => {
//   const [removeProduct] = useRemoveProductMutation();

//   const handleDelete = async (id) => {
//     try {
//       await removeProduct(id);
//       toast.success('Produto excluído com sucesso');
//     } catch (err) {
//       console.log(err);
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <>
//       <div className="pt-4">
//         <Table responsive striped bordered className="custom-table-posts">
//           <thead>
//             <tr>
//               <th className="column-name">Nome</th>
//               <th className="column-description ">Descrição</th>
//               <th className="column-sector ">Setor</th>
//               <th className="column-unit ">Unidade</th>
//               <th className="column-lastPrice ">Último preço</th>
//               <th className="column-icon">
//                 <FaEdit />
//               </th>
//               <th className="column-icon">
//                 <FaRegTrashAlt />
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => {
//               return (
//                 <tr key={product._id}>
//                   <td className="column-name">{product.name}</td>
//                   <td className="column-description">{product.description}</td>
//                   <td className="column-sector text-center">
//                     {product.sector}
//                   </td>
//                   <td className="column-unit text-center">{product.unit}</td>
//                   <td className="column-lastPrice text-center">
//                     {dotToComma(Number(product.lastPrice).toFixed(2))}
//                   </td>
//                   <td className="text-center column-icon">
//                     <ModalShowProduct product={product}>
//                       <FaEdit />
//                     </ModalShowProduct>
//                   </td>
//                   <td className="text-center column-icon">
//                     <Button onClick={() => handleDelete(product._id)}>
//                       <FaRegTrashAlt />
//                     </Button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </Table>
//       </div>
//     </>
//   );
// };

// export default TablePosts;
