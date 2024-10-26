import { useState, useEffect } from "react";
import { useSelector } from "https://cdn.skypack.dev/react-redux@7.2.3";

export const useAuth = () => {
  const { user, error } = useSelector((state) => state.auth);

  console.log(error);

  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    setLoading(false);
  }, [user]);

  return { auth, loading };
};
