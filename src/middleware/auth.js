import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const checkAuth = async () => {
  const res = await fetch('/api/auth/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // send cookie along with the request
  });

  if (res.status === 401) {
    throw new Error('Unauthorized');
  }
};

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const jwt = Cookies.get('jwt');

    if (!jwt) {
      router.push('/unauth');
      return;
    }

    checkAuth()
      .catch((err) => {
        console.error(err);
        router.push('/unauth');
      });
  }, []);
};

export default useAuth;

