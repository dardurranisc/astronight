const formatRating = (value: number | undefined): string => {
  if (!value || value === 0) return "0,0";
  return value.toFixed(1).replace(".", ",");
};

export { formatRating };
