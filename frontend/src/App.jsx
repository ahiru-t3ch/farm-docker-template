import React, {useEffect, useState} from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/') // FastAPI endpoint
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <h1>Dummy App</h1>
      {data ? <p>{data.message}</p> : <p>No data</p>}
    </>
  )
}

export default App
