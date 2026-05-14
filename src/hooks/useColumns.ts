import useMatchMedia from './useMatchMedia';

const useColumns = () => {
  const columns = useMatchMedia('600px') ? 2 : 4;

  return columns;
};

export default useColumns;
