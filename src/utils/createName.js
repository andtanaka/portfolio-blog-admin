import * as DOMPurify from 'dompurify';
const createName = (str) => {
  return DOMPurify.sanitize(str)
    .toLocaleLowerCase()
    .normalize('NFD')
    .replace(/\s/g, '-') //substitui espaço por '-'
    .replace(/[^\w\.@-]/g, '') //retira caracteres especiais
    .replace(/-+$/g, ''); //remove os '-' no final do name
};

export default createName;
