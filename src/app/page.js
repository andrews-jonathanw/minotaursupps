'use client';
import { useEffect, useState } from 'react';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import '../firebase/firebase';

const Home = () => {
  const [data, setData] = useState(null);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'test'));
        const documentsData = querySnapshot.docs.map(doc => doc.data());
        if (documentsData.length > 0) {
          setData(documentsData[0]);
        } else {
          console.log('No documents found in the collection!');
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {data ? (
          <div>
            <h1>Fuel Your Inner Beast</h1>

          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default Home;
