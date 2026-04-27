const validateForm = (value: string) => {
  if (!value.trim()) return 'you should complete this area';
};

export default validateForm;
