'use client';
import React, { useEffect, useState } from 'react';
import fetchProducts from '../lib/utils/fireStoreUtils';
import { initFirebase } from '@/firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getCheckoutUrl } from '../lib/utils/stripePayment';
import { useRouter } from 'next/navigation';
import { ProductsContext } from '@/lib/context/ProductProvider';
import Carousel from '@/components/landing/Carousel';

const slides = [
  { id: 0, imageUrl: '/assets/deadlift.jpg' },
  { id: 1, imageUrl: '/assets/supplementImages/creatine.jpg' },
  { id: 2, imageUrl: '/assets/supplementImages/23336.jpg' },
  { id: 3, imageUrl: '/assets/supplementImages/23336.jpg' },
];

const Home = () => {
  const { products } = React.useContext(ProductsContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('currency') || 'USD';
    } else {
      return 'USD';
    }
  });
  const [exchangeRates, setExchangeRates] = useState(null);
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
    const fetchExchangeRates = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();
        if (data && data.conversion_rates) {
          setExchangeRates(data.conversion_rates);
        } else {
          console.error('Invalid response format:', data);
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);



  const convertCurrency = (amount, currency) => {
    if (!exchangeRates) return amount;
    const rate = exchangeRates[currency];
    if (rate > 1) {
      return Math.round(amount * rate * 100) / 100;
    } else {
      return Math.round(amount / rate * 100) / 100;
    }
  };


  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      localStorage.setItem('user', JSON.stringify(result.user));
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const buyProduct = async (priceId) => {
    try {
      const checkoutUrl = await getCheckoutUrl(app, priceId);
      router.push(checkoutUrl);
    } catch (error) {
      setError(error.message);
    }
  };

  const setAndSaveCurrency = (value) => {
    setCurrency(value);
    localStorage.setItem('currency', value);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedCurrency = localStorage.getItem('currency');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedCurrency) {
      setCurrency(storedCurrency);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-transparent">
      {/* Carousel */}
      <Carousel slides={slides} />
      <div className='text-white'>
        <h1 className="text-4xl font-bold text-center mt-8">Welcome to the Supplement Store</h1>
        <p className="text-center mt-4">Your one-stop shop for all your supplement needs</p>
      </div>
    </main>
  );
};

export default Home;