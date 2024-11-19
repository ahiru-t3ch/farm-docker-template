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
    <h2>Dummy Component doing a simple get to FastApi</h2>
    {data ? <p>{data.message}</p> : <p>No data</p>}
    </>
    );
}