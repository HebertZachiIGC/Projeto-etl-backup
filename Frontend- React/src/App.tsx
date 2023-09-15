// import React from 'react';
import { AuthProvider } from './contexts/auth';
import Rotas from './routes';
// import AuthContext from './contexts/auth';

function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}

export default App;
