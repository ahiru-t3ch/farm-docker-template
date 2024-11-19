import React, {useEffect, useState} from "react";
import axios from 'axios';
import CreateItemForm from "./components/CreateItemForm";
import ListItems from "./components/ListItems";

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

function App() {
  const [data, setData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1); // Increment to trigger refresh
  };

  useEffect(() => {
    axios.get({FASTAPI_BASE_URL}) // FastAPI endpoint
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1>Dummy App</h1>
      {data ? <p>{data.message}</p> : <p>No data</p>}
      <ListItems trigger={refreshTrigger}/>
      <CreateItemForm onRefresh={handleRefresh} />
    </>
  )
}

export default App
