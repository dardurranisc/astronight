import { useState } from 'react';

import SectionTitle from '../SectionTitle';
import MovieModal from '../MovieModal';
import Button from '../Button';

import { HEADING } from '@/constants/headingData';

const AddSomething = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <SectionTitle text={HEADING.ADD_SUGGESTION} />
      <Button
        text=".yes."
        ariaLabel="Добавить фильм"
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
      />
      <MovieModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(!isAddModalOpen)}
      />
    </>
  );
};

export default AddSomething;
