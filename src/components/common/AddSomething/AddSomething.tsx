import { useState } from 'react';

import SectionTitle from '@components/SectionTitle';
import MovieModal from '@components/MovieModal';
import Button from '@components/Button';

import { heading } from '@/constants/headingData';

const AddSomething = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <SectionTitle text={heading.addSuggestion} />
      <Button
        text=".yes."
        ariaLabel="Добавить фильм"
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
      />
      <MovieModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(!isAddModalOpen)} />
    </>
  );
};

export default AddSomething;
