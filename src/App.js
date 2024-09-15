import './App.css';
import { useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskMainApp from './Components/task-management/TaskMainApp';
import TaskDetails from './Components/task-management/TaskDetails';

function App() {
  const isLoading = useSelector((state) => state.loader.isLoading)
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  console.warn(isLoading);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<TaskMainApp />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
        <ToastContainer />
      </div>
      {isLoading && <ClipLoader
        color={"#ffffff"}
        loading={isLoading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}
    </>
  );
}

export default App;
