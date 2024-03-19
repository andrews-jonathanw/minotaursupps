'use client';
import { useEffect, useState } from 'react';
import fetchData from '../lib/utils/fireStoreUtils';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFromFirestore();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {data ? (
          <div>
            <h1>Fuel Your Inner Beast</h1>
            {data.hello}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default Home;
