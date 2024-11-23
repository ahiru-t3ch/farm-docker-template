import React, {useEffect, useState} from "react";
import axios from 'axios';

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function DummyComponent(){
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${FASTAPI_BASE_URL}`)
          .then(response => setData(response.data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    return (
    <>
    <div className="grid gap-2 p-4">
      <h2 className="text-left text-xl">Dummy Component doing a simple get to FastApi</h2>
      {data ? <p className="text-left italic">{data.message}</p> : <p>No data</p>}
    </div>
    </>
    );
}