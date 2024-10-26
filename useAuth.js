import { useState, useEffect } from "react";
import {store} from './store.js'
import { useSelector } from "https://cdn.skypack.dev/react-redux@7.2.3";

export const useAuth = () => {
  const [authState, setAuthState] = useState({
      user: null,
      loading: true
    });
  useEffect(() => {
      // Inscrever-se nas mudanças do store
      const unsubscribe = store.subscribe(() => {
        const state = store.getState() as AuthState;
        setAuthState({
          user: state.auth.user && true,
          loading: false
        });
      });

      // Carregar estado inicial
      const state = store.getState() as AuthState;
      setAuthState({
        user: state.auth.user && true,
        loading: false
      });

      return () => unsubscribe();
    }, []);

  return { auth: authState.user, loading: authState.loading };
};
