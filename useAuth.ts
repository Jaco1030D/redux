import { RootState } from "./strore";
import { useState, useEffect } from "react";
import { useSelector } from "https://cdn.skypack.dev/react-redux";

export const useAuth = () => {
  const { user, error } = useSelector((state:RootState) => state.auth);

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
