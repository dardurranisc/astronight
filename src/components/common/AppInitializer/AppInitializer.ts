import { useEffect, ReactNode } from 'react';

import { useDispatch } from 'react-redux';

interface AppInitializerProps {
  children: ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'movieRequest' });
  }, [dispatch]);

  return children;
};

export default AppInitializer;
