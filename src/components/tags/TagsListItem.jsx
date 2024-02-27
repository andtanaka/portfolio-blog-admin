import { Link } from 'react-router-dom';
import styles from './TagsList.module.scss';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

import { Button } from 'react-bootstrap';
import { useGetTagByIdQuery, useRemoveTagMutation } from '../../store';
import { toast } from 'react-toastify';
import ModalUpdateTag from './ModalUpdateTag';
import Loader from '../Loader';

const TagsListItem = ({ tag }) => {
  const [removeTag, { isLoading: loadingRemove }] = useRemoveTagMutation();

  const handleDelete = async (id) => {
    try {
      await removeTag(id).unwrap();
      toast.success('Produto excluído com sucesso');
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <li className={styles.itemList}>
      <div>
        {/* Esse link vai ser para o path /admin/posts?tag=#tagName */}
        <Link to="/admin/tags">
          #{tag.name} - {tag.count} {tag.count > 1 ? 'Posts' : 'Post'}
        </Link>
      </div>
      <div className="ms-auto">
        <ModalUpdateTag tag={tag}>
          <FaRegEdit />
        </ModalUpdateTag>
        <Button
          className="ms-2"
          onClick={() => handleDelete(tag._id)}
          disabled={loadingRemove}
        >
          <FaRegTrashAlt />
        </Button>
      </div>
    </li>
  );
};

export default TagsListItem;
