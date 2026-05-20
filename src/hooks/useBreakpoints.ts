import useMatchMedia from './useMatchMedia';

export const useBreakpoints = () => {
  const isTabletMedium = useMatchMedia('600px');
  const isDesktop = useMatchMedia('1024px');

  if (isTabletMedium) return 'tablet-medium';
  if (isDesktop) return 'desktop';
  return 'wide';
};
