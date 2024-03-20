'use client';
import { useEffect, useState } from 'react';
import fetchProducts from '../lib/utils/fireStoreUtils';
import { initFirebase } from '@/firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getCheckoutUrl } from '../lib/utils/stripePayment';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');
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
    const fetchProductsData = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      }
    };

    fetchProductsData();
  }, []);

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user && (
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-semibold">{user.displayName}</h1>
          <img className="w-20 h-20 rounded-full" src={user.photoURL} alt={user.displayName} />
          <select className="mt-2 p-1" value={currency} onChange={(e) => setAndSaveCurrency(e.target.value)}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            {product.prices.map(price => (
              <div key={price.id}>
                <p className="text-gray-700 mb-2">Price: {convertCurrency(price.unit_amount / 100, currency).toLocaleString('en-US', { style: 'currency', currency: currency })}</p>
                <button className="border border-black bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => buyProduct(price.id)}>
                  Buy {product.name}
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <button className="border border-black bg-blue-500 text-white px-4 py-2 rounded-md" onClick={signIn}>
          Sign in with Google
        </button>
        <button className="border border-black bg-blue-500 text-white px-4 py-2 rounded-md" onClick={signOut}>
          Sign Out
        </button>
      </div>
      {error && <p className="text-xs text-red-400 mt-4">{error}</p>}
    </main>
  );
};

export default Home;

