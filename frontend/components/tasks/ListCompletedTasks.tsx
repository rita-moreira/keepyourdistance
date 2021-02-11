import React from "react";
import { useFetch } from "../../actions/adminTask";
import { API } from "../../config";

// components
import Loading from "../individual/Loading";
import CompletedAdminTasks from "../user/tasks/CompletedAdminTasks";
const ListCompletedTasks: React.FC = () => {
  const { data, error } = useFetch(`${API}/api/adminTasks`);

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <div>
        <Loading />
      </div>
    );
  // mostrar so as que foram partilhadas
  const showTasks = data.filter((item: any) => {
    return item.share;
  });
  return (
    <div>
      <CompletedAdminTasks admintasks={showTasks} />
    </div>
  );
};

export default ListCompletedTasks;
