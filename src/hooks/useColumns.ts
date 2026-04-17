import { useState, useEffect } from "react";

const useColumns = () => {
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    const getColumns = () => {
      if (window.matchMedia("(max-width:600px)").matches) return 2;
      else return 4;
    };

    const updateColumns = () => setColumns(getColumns());
    updateColumns();

    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
};

export default useColumns;
