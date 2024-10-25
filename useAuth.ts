import { useState, useEffect } from 'react'
import { store } from './store'

interface User {
  _id: string;
  token: string;
}

interface AuthState {
  auth: {
    user: User | null;
    loading: boolean;
  }
}

export function withFramerAuth(Component: React.ComponentType) {
  return function AuthWrapped(props: any) {
    const [authState, setAuthState] = useState({
      user: null,
      loading: true
    });

    useEffect(() => {
      // Inscrever-se nas mudanças do store
      const unsubscribe = store.subscribe(() => {
        const state = store.getState() as AuthState;
        setAuthState({
          user: state.auth.user,
          loading: state.auth.loading
        });
      });

      // Carregar estado inicial
      const state = store.getState() as AuthState;
      setAuthState({
        user: state.auth.user,
        loading: state.auth.loading
      });

      return () => unsubscribe();
    }, []);

    // Você pode adicionar sua lógica de proteção de rota aqui
    if (authState.loading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} auth={authState} />;
  }
}
