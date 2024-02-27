import { Link } from 'react-router-dom';
import styles from './TagsList.module.scss';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

import { Button } from 'react-bootstrap';
import { useGetTagByIdQuery, useRemoveTagMutation } from '../../store';
import { toast } from 'react-toastify';
import ModalUpdateTag from './ModalUpdateTag';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setOptionsTags } from '../../store/slices/tagSlice';

const TagsListItem = ({ tag }) => {
  const { optionsTags } = useSelector((state) => state.tag);
  const dispatch = useDispatch();

  const [removeTag, { isLoading: loadingRemove }] = useRemoveTagMutation();

  const handleDelete = async (id) => {
    try {
      await removeTag(id).unwrap();
      toast.success('Produto excluído com sucesso');
      const tags = optionsTags.filter((val) => val.value !== id);
      dispatch(setOptionsTags(tags));
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <li className={styles.itemList}>
      <div className="d-flex align-items-center d-sm-block">
        {/* Esse link vai ser para o path /admin/posts?tag=#tagName */}
        <Link to="/admin/tags" className={styles.text}>
          #{tag.name} - {tag.count} {tag.count > 1 ? 'Posts' : 'Post'}
        </Link>
      </div>
      <div className="d-sm-block ms-auto">
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
