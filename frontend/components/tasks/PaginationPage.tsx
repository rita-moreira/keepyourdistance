import React, { useEffect, useState } from "react";
import Pagination from "@material-ui/lab/Pagination";
interface PaginationPageProps {
  tasksPerPage: number;
  totalTasks: number;
  currentPage: number;
  setPage: (currentPage: number) => void;
}
const PaginationPage: React.FC<PaginationPageProps> = ({
  tasksPerPage,
  totalTasks,
  currentPage,
  setPage,
}: {
  tasksPerPage: number;
  totalTasks: number;
  currentPage: number;
  setPage: (currentPage: number) => void;
}) => {
  const [pageNumbers, setPageNumbers] = useState(1);

  useEffect(() => {
    setPageNumbers(Math.ceil(totalTasks / tasksPerPage));
  }, [totalTasks]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={pageNumbers}
        page={currentPage}
        color="primary"
        showFirstButton
        showLastButton
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationPage;
