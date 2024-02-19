function removeEmptyValues(obj) {
  //remove os pares cujo valor é vazio
  // entrada: {k1: val1, k2: val2, ...}
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const size = keys.length;

  let result = {};
  if (size === 0) return '';
  else {
    for (let i = 0; i < size; i++) {
      if (values[i]) {
        result[keys[i]] = values[i];
      }
    }
  }
  return result;
}

function getSearchUrl(obj) {
  //retorna uma query string
  // entrada: {k1: val1, k2: val2, ...}
  let search = removeEmptyValues(obj);

  const keys = Object.keys(search);
  const values = Object.values(search);
  const size = keys.length;
  if (size === 0) return '';
  let searchUrl = `?${keys[0]}=${values[0]}`;

  if (size === 1) {
    return searchUrl;
  } else {
    for (let i = 1; i < size; i++) {
      searchUrl = searchUrl.concat(`&${keys[i]}=${values[i]}`);
    }
    return searchUrl;
  }
}

export { getSearchUrl };
