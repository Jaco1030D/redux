import { useState, useEffect } from 'react';
import { store } from './store';

export function withFramerAuth(Component) {
  return function AuthWrapped(props) {
    const [authState, setAuthState] = useState({
      user: null,
      loading: true
    });

    useEffect(() => {
      // Inscrever-se nas mudanças do store
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        setAuthState({
          user: state.auth.user,
          loading: state.auth.loading
        });
      });

      // Carregar estado inicial
      const state = store.getState();
      setAuthState({
        user: state.auth.user,
        loading: state.auth.loading
      });

      return () => unsubscribe();
    }, []);

    // Lógica de proteção de rota
    if (authState.loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} auth={authState} />;
  };
}
