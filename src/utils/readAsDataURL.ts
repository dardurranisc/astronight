interface ReadAsDataURL {
  file: File;
  setField: (value: string) => void;
}

const readAsDataURL = ({ file, setField }: ReadAsDataURL) => {
  const reader = new FileReader();

  reader.onload = () => {
    setField(reader.result as string);
  };

  reader.readAsDataURL(file);
};

export { readAsDataURL };
