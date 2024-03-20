'use client';
import { useEffect, useState } from 'react';
import fetchData from '../lib/utils/fireStoreUtils';
import { initFirebase } from '@/firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getCheckoutUrl } from '../lib/utils/stripePayment';
import {useRouter} from 'next/navigation';

const Home = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const app = initFirebase();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFromFirestore();
  }, []);

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const buyProduct = async () => {
    const priceId = 'price_1OwTGHBxfh2DMycNZPky2SoK';
    try {
      const checkoutUrl = await getCheckoutUrl(app, priceId);
      router.push(checkoutUrl);
    } catch (error) {
      setError(error.message);
    }
  };



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {data ? (
          <div>
            <h1>Fuel Your Inner Beast</h1>
            {Object.keys(data).map((key) => {
              return (
                <div key={key}>
                  <h1>
                    {key} {data[key]}
                  </h1>
                </div>
              );
            })}
            {user && (
              <div>
                <h1>{user.displayName}</h1>
                <img src={user.photoURL} alt={user.displayName} />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button className="border border-black bg-blue-500" onClick={signIn}>
                Sign in with Google
              </button>
              <button className="border border-black bg-blue-500" onClick={signOut}>
                Sign Out
              </button>
            <button className="border border-black bg-blue-500" onClick={buyProduct}>
              Buy Test Product
            </button>
            {error && <p className='text-xs text-red-400'>{error}</p>}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default Home;

