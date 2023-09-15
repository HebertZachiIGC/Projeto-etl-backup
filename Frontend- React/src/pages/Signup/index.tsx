import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';
import { Navigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const { signup, signed } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Email and password is required');
      return;
    }
    await signup(email, password);
  };

  if (signed) {
    return <Navigate to="/home" />;
  }

  return (
    <div>
      <form onSubmit={handleSignup}>
        <h1>Cadastro</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
};

export default SignUp;
