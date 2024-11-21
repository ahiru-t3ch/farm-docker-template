import React, {useEffect, useState} from "react";
import axios from 'axios';
import CreateItemForm from "./components/CreateItemForm";
import ListItems from "./components/ListItems";
import DummyComponent from "./components/DummyComponent";

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1); // Increment to trigger refresh
  };

  return (
    <>
      <h1 className="text-3xl font-bold underline">Dummy App</h1>
      <DummyComponent />
      <ListItems trigger={refreshTrigger}/>
      <CreateItemForm onRefresh={handleRefresh} />
    </>
  )
}

export default App
