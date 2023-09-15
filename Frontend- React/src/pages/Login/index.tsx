import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';
import { Link, Navigate } from 'react-router-dom';
import porta from '../../assets/log-in.svg';
// import './index.css';


const Login: React.FC = () => {
  const { signin, signed } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
    }

    await signin(email, password);
  };

  if (signed) {
    return <Navigate to="home" />;
  }

  return (
      <div>
        <p>Entre com suas informações de cadastro.</p>

        <form onSubmit={handleSubmit}>

          <label>E-mail</label>

          <input
            type="email"
            name="email"
            className="input"
            placeholder="Digite seu e-mail"
            pattern="+@+"
            title="nome@seudominio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <br />
          
          <label>Senha</label>
          
          <input
            type="password"
            name="password"
            className=""
            placeholder="Digite sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br />
          <button className="" type="submit">
            Entrar
          </button>

          <div className="">
            <p>
              Não tem uma conta?{' '}
              <Link to="/signup">
                <strong>registre-se</strong>
              </Link>
            </p>
          </div>
        </form>
      </div>
  );
};

export default Login;
