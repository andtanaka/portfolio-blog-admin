import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQuery() {
  const { search } = useLocation();
  // console.log(useLocation());
  // console.log(new URLSearchParams(search).get('name'));
  return useMemo(() => new URLSearchParams(search), [search]);
}
