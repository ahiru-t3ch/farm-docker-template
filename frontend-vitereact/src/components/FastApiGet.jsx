import React, {useEffect, useState} from "react";
import axios from 'axios';

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;

export default function FastApiGet(){
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`${FASTAPI_BASE_URL}`)
          .then(response => setData(response.data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    return (
    <div className="p-6 bg-gray-100 rounded shadow">
        <h3 className="text-lg font-bold mb-2">FastAPI Hello World</h3>
        {data ? <p className="text-gray-600">{data.message}</p> : <p className="text-gray-600">No data</p>}
    </div>
    );
}