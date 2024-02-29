import { HiDocumentDuplicate } from 'react-icons/hi2';
import { IoMdPricetags } from 'react-icons/io';
import { RiFileList3Fill } from 'react-icons/ri';

//Menus:

const menuAppOptions = [
  {
    value: '/admin/tags',
    label: 'Tags',
    icon: <IoMdPricetags size="1.5rem" />,
  },
  {
    value: '/admin/posts/draft',
    label: 'Rascunhos',
    icon: <RiFileList3Fill size="1.5rem" />,
  },
  {
    value: '/admin/posts',
    label: 'Posts',
    icon: <HiDocumentDuplicate size="1.5rem" />,
  },
];

export { menuAppOptions };
